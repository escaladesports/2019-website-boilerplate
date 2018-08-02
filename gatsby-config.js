require(`dotenv`).config({ silent: true })
const config = require(`./site-config`)
const proxy = require(`http-proxy-middleware`)

module.exports = {
	plugins: [
		// Build plugins
		`gatsby-plugin-emotion`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-remove-trailing-slashes`,
		`gatsby-plugin-netlify-cms-paths`,
		`gatsby-plugin-sitemap`,
		`gatsby-plugin-robots-txt`,
		`gatsby-plugin-netlify`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/markdown`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/static/uploads`,
				name: `uploads`,
			},
		},
		{
			resolve: `gatsby-plugin-markdown-pages`,
			options: {
				path: `./src/markdown/pages`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-plugin-netlify-cms-paths`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							target: `_blank`,
						},
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1200,
							linkImagesToOriginal: false,
							withWebp: {
								quality: 95,
							},
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-netlify-cms`,
			options: {
				modulePath: `${__dirname}/src/components/cms.js`,
			},
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: config.siteUrl,
			},
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: config.title,
				short_name: config.shortTitle,
				start_url: `/`,
				background_color: `#fff`,
				theme_color: `#52b8fc`,
				display: `minimal-ui`,
				icon: `src/img/icon.png`,
			},
		},
		`gatsby-plugin-offline`,

		// Client plugins
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-recaptcha`,
		`gatsby-plugin-netlify-identity-widget`,
		`gatsby-plugin-polyfill-io`,
		{
			resolve: `gatsby-plugin-html-attributes`,
			options: {
				lang: `en`,
			},
		},
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: `./src/img/icon.png`,
				injectHTML: true,
				icons: {
					android: false,
					appleIcon: false,
					appleStartup: false,
					coast: false,
					favicons: true,
					firefox: false,
					twitter: false,
					yandex: false,
					windows: false,
				},
			},
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: `GTM-TD88KD8`,
			},
		},
		{
			resolve: `gatsby-plugin-web-font-loader`,
			options: {
				google: {
					families: [
						`Oswald`,
						`Open Sans`,
					],
				},
			},
		},
	],
	siteMetadata: config,
	developMiddleware: app => {
		app.use(
			`/.netlify/functions/`,
			proxy({
				target: `http://localhost:9000`,
				pathRewrite: {
					"/.netlify/functions/": ``,
				},
			})
		)
	},
}
