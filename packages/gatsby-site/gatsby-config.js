const { GATSBY_ESCA_API_SITE, SANITY_TOKEN } = require(`utils/env`)
const { readFileSync } = require(`fs-extra`)
const proxy = require(`http-proxy-middleware`)
const { parse: parseToml } = require(`toml`)
const { parse: parseUrl } = require(`url`)
const sanityToExcerpt = require(`utils/sanity-to-excerpt`)
const { siteUrl } = require(`config`)
const productIds = require(`utils/.cache/product-ids.json`)
const { title, description } = require(`utils/.cache/site-settings.json`)

// Get redirects from config
const netlifyConfig = readFileSync(`../../netlify.toml`)
const { redirects } = parseToml(netlifyConfig)

module.exports = {
	siteMetadata: {
		title,
		description,
		siteUrl,
	},
	plugins: [
		`gatsby-plugin-emotion`,
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-remove-trailing-slashes`,
		{
			resolve: `escalade-stock`,
			options: {
				ids: productIds,
				siteId: GATSBY_ESCA_API_SITE,
			},
		},
		{
			resolve: `escalade-pricing`,
			options: {
				ids: productIds,
				siteId: GATSBY_ESCA_API_SITE,
			},
		},
		`blog`,
		`generic-pages`,
		`products`,
		`accounts`,
		{
			resolve: `email-templates`,
			options: {
				siteUrl,
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				exclude: [`/email-templates/*`],
			},
		},
		{
			resolve: `gatsby-plugin-robots-txt`,
			options: {
				policy: [
					{
						userAgent: `*`,
						disallow: [`/email-templates`],
					},
				],
			},
		},
		`gatsby-plugin-netlify`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/static`,
				name: `images`,
			},
		},
		{
			resolve: `gatsby-source-sanity`,
			options: {
				projectId: `lfxwk0kx`,
				dataset: `production`,
				token: SANITY_TOKEN,
			},
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl,
			},
		},

		// Client plugins
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-polyfill-io`,
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
		// {
		// 	resolve: `gatsby-plugin-google-analytics`,
		// 	options: {
		// 		trackingId: `UA-2411855-10`,
		// 		anonymize: true,
		// 		respectDNT: true,
		// 	},
		// },
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `{
					site{
						siteMetadata{
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}`,
				feeds: [
					{
						query: `{
							allSanityPost(
								limit: 1000,
								sort: { order: DESC, fields: [date]}
							){
								edges{
									node{
										_rawBody
										title
										date
										slug{
											current
										}
									}
								}
							}
						}`,
						serialize: ({
							query: {
								site: {
									siteMetadata: { siteUrl },
								},
								allSanityPost: { edges },
							},
						}) => {
							return edges.map(
								({
									node: {
										_rawBody,
										slug,
										...props
									},
								}) => {
									return {
										...props,
										url: `${siteUrl}/${slug}`,
										guid: `${siteUrl}/${slug}`,
										custom_elements: [{ 'content:encoded': `${sanityToExcerpt(_rawBody, 15)}...` }],
									}
								}
							)
						},
						output: `/rss.xml`,
					},
				],
			},
		},
		{
			resolve: `search`,
			options: {
				query: `{
					allSanityPost{
						edges {
							node {
								id
								_rawBody
								title
								slug{
									current
								}
							}
						}
					}
				}`,
				parse: ({ allSanityPost: { edges }}) => {
					return edges.map(
						({
							node: {
								id,
								_rawBody,
								title,
								slug: { current },
							},
						}) => {
							return {
								id,
								index: {
									body: sanityToExcerpt(_rawBody),
									title,
								},
								store: {
									title,
									excerpt: sanityToExcerpt(_rawBody, 15),
									path: current,
								},
							}
						}
					)
				},
			},
		},

		// Dev plugins
		`gatsby-plugin-webpack-size`,
		// {
		// 	resolve: `schema-snapshot`,
		// 	options: {
		// 		include: [
		// 			`MarkdownRemark`,
		// 			`MarkdownRemarkFrontmatter`,
		// 			`MarkdownRemarkFrontmatterVariants`,
		// 			`MarkdownRemarkFields`,
		// 			`EscaladeInventory`,
		// 			`EscaladeInventoryLocations`,
		// 			`EscaladePricing`,
		// 		],
		// 	},
		// },
	],
	developMiddleware: app => {
		// Proxy lambda endpoints
		app.use(
			`/.netlify/functions/`,
			proxy({
				target: `http://localhost:9000`,
				pathRewrite: {
					'/.netlify/functions': ``,
				},
			})
		)

		// Create redirects from netlify.toml
		if(redirects && redirects.length){
			redirects.forEach(({
				from,
				to,
				status,
				headers,
			}) => {
				// Proxy external links
				if (from && to.indexOf(`http`) === 0 && status === 200) {
					const { protocol, host } = parseUrl(to)
					const target = `${protocol}//${host}`
					app.use(
						from,
						proxy({
							target,
							changeOrigin: true,
							headers,
							pathRewrite: (path => {
								const externalPath = to.replace(target, ``)
								const newPath = path.replace(from, externalPath)
								return newPath
							}),
						})
					)
				}
			})
		}
	},
}