module.exports = {
	schema: 'http://localhost:3000/api/graphql',
	documents: 'src/**/*.{graphql,js,ts,jsx,tsx}',
	extensions: {
		endpoints: {
			default: {
				url: 'http://localhost:3000/api/graphql',
			},
		},
	},
}
