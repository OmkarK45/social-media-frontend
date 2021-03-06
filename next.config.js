/**
 * @type {import('next').NextConfig }
 **/
module.exports = {
	async rewrites() {
		return [
			{
				source: '/bee.js',
				destination: 'https://cdn.splitbee.io/sb.js',
			},
			{
				source: '/_hive/:slug',
				destination: 'https://hive.splitbee.io/:slug',
			},
		]
	},
	images: {
		domains: [
			'res.cloudinary.com',
			'c.tenor.com',
			'giphy.com',
			'images.unsplash.com',
		],
	},
}
