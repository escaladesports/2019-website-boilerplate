const {
	GATSBY_ESCA_API_SITE,
	SANITY_READ_TOKEN,
	SANITY_OVERLAY,
	SANITY_WATCHMODE,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_NAME,
} = require(`utils/env`)
const proxy = require(`http-proxy-middleware`)
const { parse: parseUrl } = require(`url`)
const sanityToExcerpt = require(`utils/sanity-to-excerpt`)
const { siteUrl } = require(`config`)
const productIds = require(`utils/.cache/product-ids.json`)
const { redirects } = require(`./netlify-config`)
const { title, description } = require(`utils/.cache/site-settings.json`)

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
			resolve: `cloudinary`,
			options: {
				apiKey: CLOUDINARY_API_KEY,
				apiSecret: CLOUDINARY_API_SECRET,
				cloudName: CLOUDINARY_NAME,
				queryParams: {
					max_results: 1000,
				},
			},
		},
		{
			resolve: `escalade-inventory`,
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
		// {
		// 	resolve: `gatsby-plugin-browser-dependencies`,
		// 	option: {
		// 		dependencies: [
		// 			`auth-js`,
		// 		],
		// 	},
		// },
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
				projectId: `xagm8sct`,
				dataset: `dev`,
				token: SANITY_READ_TOKEN,
				overlayDrafts: SANITY_OVERLAY,
				watchMode: SANITY_WATCHMODE,
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
		// {
		// 	resolve: `gatsby-plugin-favicon`,
		// 	options: {
		// 		logo: `./src/img/icon.png`,
		// 		injectHTML: true,
		// 		icons: {
		// 			android: false,
		// 			appleIcon: false,
		// 			appleStartup: false,
		// 			coast: false,
		// 			favicons: true,
		// 			firefox: false,
		// 			twitter: false,
		// 			yandex: false,
		// 			windows: false,
		// 		},
		// 	},
		// },
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
		app.use(`/.netlify/functions/`, proxy({
			target: `http://localhost:9000`,
			pathRewrite: {
				'/.netlify/functions': ``,
			},
		}))

		// CMS
		// Uses redirect rather than proxy since Sanity has issues with pseudo HTTPS locally
		app.use(`/admin`, (req, res) => {
			res.redirect(`http://localhost:3333`)
		})

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
					const fixedHeaders = {}
					for(let i in headers){
						if(headers[i]){
							fixedHeaders[i] = headers[i]
						}
					}
					const { protocol, host } = parseUrl(to)
					const target = `${protocol}//${host}`
					app.use(from, proxy({
						target,
						changeOrigin: true,
						headers,
						pathRewrite: (path => {
							const externalPath = to.replace(target, ``)
							const newPath = path.replace(from, externalPath)
							return newPath
						}),
					}))
				}
			})
		}
	},
}