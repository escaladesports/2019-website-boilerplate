require('dotenv').config({ silent: true })
module.exports = {
	plugins: [
		'gatsby-plugin-styled-jsx-postcss',
		'gatsby-plugin-offline',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'img',
				path: `${__dirname}/src/img`
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'products',
				path: `${__dirname}/src/products`
			},
		},
		{
			resolve: 'gatsby-source-salsify',
			options: {
				ids: ['U2508', 'U2000'],
				apiKey: process.env.SALSIFY_API_KEY
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-transformer-remark',
	],
}
