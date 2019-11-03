const { RESTDataSource } = require('apollo-datasource-rest');
const isEmail = require('isemail');
const {BASE_URL} = require('../config')

class UserAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = BASE_URL;
	}

	async login({ email, password } = {}) {
		return this.post('auth/local', { identifier: email, password });
	}

	async register({ email, password, username }) {
		return this.post('auth/local/register', { email, username, password });
	}

	userReducer(item) {
		return {
			id: item.id || 0,
			username: item.username,
			email: item.email,
			picture: item.picture && item.picture.url
		};
	}
}

module.exports = UserAPI;
