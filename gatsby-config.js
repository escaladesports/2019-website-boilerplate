require(`dotenv`).config({ silent: true })
const striptags = require(`striptags`)
const { readFileSync } = require(`fs-extra`)
const globby = require(`globby`).sync
const matter = require(`gray-matter`)
const { siteUrl } = require(`./site-config`)

// Get site info from markdown
const { siteTitle, siteDescription } = matter(
	readFileSync(`./src/markdown/settings/site.md`)
).data

// Get product IDs from markdown
const productMarkdown = globby(`./src/markdown/products/**/*.md`)
const productIds = []
productMarkdown.forEach(path => {
	const contents = readFileSync(path)
	const { id, variants } = matter(contents).data
	productIds.push(id)
	if (Array.isArray(variants)) {
		variants.forEach(({ id }) => {
			if (id) {
				productIds.push(id)
			}
		})
	}
})

module.exports = {
	siteMetadata: {
		title: siteTitle,
		description: siteDescription,
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
				siteId: process.env.GATSBY_ESCA_API_SITE,
			},
		},
		{
			resolve: `escalade-pricing`,
			options: {
				ids: productIds,
				siteId: process.env.GATSBY_ESCA_API_SITE,
			},
		},
		`blog`,
		`generic-pages`,
		`products`,
		`client-paths`,
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
				path: `${__dirname}/src/markdown`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-copy-linked-files`,
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							target: `_blank`,
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-netlify-cms`,
			options: {
				modulePath: `${__dirname}/src/components/cms/index.js`,
				enableIdentityWidget: false,
				manualInit: true,
			},
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl,
			},
		},
		`cms-no-index`,

		// Client plugins
		// `zygote`,
		`route-delayed-animation`,
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
		`fonts`,
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
							allMarkdownRemark(
								limit: 1000,
								sort: { order: DESC, fields: [frontmatter___date]},
								filter: {
									fileAbsolutePath: {
										regex: "/src/markdown/blog/"
									}
									frontmatter: {
										published: { eq: true }
									}
								}
							){
								edges{
									node{
										excerpt
										html
										fields{
											path
										}
										frontmatter{
											title
											date
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
								allMarkdownRemark: { edges },
							},
						}) => {
							return edges.map(
								({
									node: {
										html,
										frontmatter,
										fields: { path },
									},
								}) => {
									return {
										...frontmatter,
										url: `${siteUrl}${path}`,
										guid: `${siteUrl}${path}`,
										custom_elements: [{ 'content:encoded': html }],
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
					allMarkdownRemark(
						filter: {
							frontmatter: {
								published: { eq: true }
							}
						}
					) {
						edges {
							node {
								id
								html
								excerpt
								frontmatter {
									title
								}
								fields{
									path
								}
							}
						}
					}
				}`,
				parse: data => {
					data = data.allMarkdownRemark.edges
					data = data.filter(({ node }) => {
						if (node && node.fields && node.fields.path) {
							return true
						}
						return false
					})
					return data.map(
						({
							node: {
								id,
								html,
								excerpt,
								frontmatter: { title },
								fields: { path },
							},
						}) => {
							return {
								id,
								index: {
									body: striptags(html),
									title,
								},
								store: {
									title,
									excerpt,
									path,
								},
							}
						}
					)
				},
			},
		},

		// Dev plugins
		`open-browser`,
		`gatsby-plugin-webpack-size`,
		{
			resolve: `schema-snapshot`,
			options: {
				include: [
					`MarkdownRemark`,
					`MarkdownRemarkFrontmatter`,
					`MarkdownRemarkFrontmatterVariants`,
					`MarkdownRemarkFields`,
					`EscaladeInventory`,
					`EscaladeInventoryLocations`,
					`EscaladePricing`,
				],
			},
		},
	],
}
