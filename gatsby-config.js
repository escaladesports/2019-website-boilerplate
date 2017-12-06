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
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-transformer-remark',
	],
}
