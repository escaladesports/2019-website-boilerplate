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
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
	],
}
