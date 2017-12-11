require('dotenv').config({ silent: true })
module.exports = {
	plugins: [
		'gatsby-plugin-styled-jsx-postcss',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: `${__dirname}/src/pages`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'img',
				path: `${__dirname}/src/img`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'products',
				path: `${__dirname}/src/products`,
			},
		},
		{
			resolve: 'gatsby-source-salsify',
			options: {
				ids: ['U2508', 'U2000'],
				//markdownPath: `${__dirname}/src/products`,
				apiKey: process.env.SALSIFY_API_KEY,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-feed',
		'gatsby-plugin-offline',
		'gatsby-plugin-react-helmet',
	],
}
