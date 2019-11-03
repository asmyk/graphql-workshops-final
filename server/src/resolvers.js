const { paginateResults } = require('./utils');
const { RESTDataSource } = require('apollo-datasource-rest');
const { UserInputError } = require('apollo-server');

const reviewResolver = (_, { id }, { dataSources }) => dataSources.reviewsAPI.getReviewById({ id });
const userResolver = (_, { id }, { dataSources }) => dataSources.userAPI.getUserById({ id });

module.exports = {
	Query: {
		restaurants: async (_, { pageSize = 20, after }, { dataSources }) => {
			const allRestaurants = await dataSources.restaurantsAPI.getAllRestaurants();

			const items = paginateResults({
				after,
				pageSize,
				results: allRestaurants
			});
			return {
				totalCount: allRestaurants.length,
				edges: items,
				pageInfo: {
					cursor: items.length ? items[items.length - 1].cursor : null,
					// if the cursor of the end of the paginated results is the same as the
					// last item in _all_ results, then there are no more results after this
					hasNextPage: items.length
						? items[items.length - 1].cursor !== allRestaurants[allRestaurants.length - 1].cursor
						: false
				}
			};
		},
		restaurant: (_, { id }, { dataSources }) => dataSources.restaurantsAPI.getRestaurantById({ id }),
		review: reviewResolver,
		author: userResolver,
		me: async (_, __, ___) => ___.models.User.me()
	},
	Mutation: {
		login: async (_, { email, password }, { dataSources }) => {
			try {
				const user = await dataSources.userAPI.login({ email, password });
				return user;
			} catch (error) {
				throw new UserInputError('dupa', { user: { password: 'wrong password or email' } });
			}
		},
		register: async (_, { email, password, username }, { dataSources }) => {
			const user = await dataSources.userAPI.register({ email, password, username });
			return user;
		},
		review: async (_, { content, note, restaurant }, { dataSources, models }) => {
			const data = await models.User.me();
			const review = await dataSources.reviewsAPI.addReview({ author: data.id, content, note, restaurant });
			return review;
		}
	},
	Review: {
		author: async (parent, _, ctx) => {
			const author = parent.author;
			if (!author.username) {
				const data = await ctx.models.User.getById(author.id || author);
				return ctx.dataSources.userAPI.userReducer(data);
			}
			return author;
		}
	},
	Restaurant: {
		reviews: async (parent, { pageSize = 20, after }, { dataSources }) => {
			const allReviews = parent.reviews.map(dataSources.reviewsAPI.reviewReducer) || [];
			const items = paginateResults({
				after,
				pageSize,
				results: allReviews
			});
			return {
				totalCount: allReviews.length,
				edges: items,
				cursor: items.length ? items[items.length - 1].cursor : null,
				// if the cursor of the end of the paginated results is the same as the
				// last item in _all_ results, then there are no more results after this
				hasMore: items.length
					? items[items.length - 1].cursor !== allReviews[allReviews.length - 1].cursor
					: false
			};
		}
	}
};
