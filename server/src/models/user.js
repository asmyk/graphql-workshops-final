const fetch = require('node-fetch');

const generateUserModel = ({ req }) => ({
	getAll: () => {
		return fetch('http://localhost:1337/users', { headers: req.headers });
	},
	me: async () => {
		const data = await fetch(`http://localhost:1337/users/me`, { headers: req.headers });
		const user = await data.json();
		return user;
	},
	getById: async (id) => {
		const data = await fetch(`http://localhost:1337/users/${id}`, { headers: req.headers });
		const user = await data.json();
		return user;
	}
});

module.exports = { generateUserModel };
