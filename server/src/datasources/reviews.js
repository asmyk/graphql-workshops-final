const { RESTDataSource } = require('apollo-datasource-rest');
const { BASE_URL } = require('../config');

class ReviewsAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = BASE_URL;
	}

	reviewReducer(item) {
		return {
			id: item.id || 0,
			cursor: `${item.id}`,
			content: item.content,
			note: item.note,
			likes: item.likes,
			author: item.author
		};
	}

	async addReview({ author, content, note, restaurant }) {
		const res = await this.post(
			'reviews',
			{ author, content, note, restaurant },
			{
				headers: {
					Authorization: this.context.authorization
				}
			}
		);
		return this.reviewReducer(res);
	}

	async getReviewById({ id }) {
		const res = await this.get('reviews', { id });
		return this.reviewReducer(res[0]);
	}
}

module.exports = ReviewsAPI;
