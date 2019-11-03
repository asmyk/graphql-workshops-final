const { RESTDataSource } = require('apollo-datasource-rest');
const { BASE_URL } = require('../config');

class RestaurantsAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = BASE_URL;
	}

	// leaving this inside the class to make the class easier to test
	restaurantReducer(item) {
		return {
			id: item.id || 0,
			cursor: `${item.id}`,
			name: item.name,
			description: item.description,
			avatar: item.cover && item.cover[0].url,
			address: item.address,
			website: item.website,
			reviews: item.reviews
		};
	}

	async getAllRestaurants() {
		const response = await this.get('restaurants');
		return Array.isArray(response) ? response.map((item) => this.restaurantReducer(item)) : [];
	}

	async getRestaurantById({ id }) {
		const res = await this.get('restaurants', { id });
		return this.restaurantReducer(res[0]);
	}

	async getRestaurantsByIds({ ids }) {
		return Promise.all(ids.map((id) => this.getLaunchById({ id })));
	}
}

module.exports = RestaurantsAPI;
