require('dotenv').config({ silent: true })
const meta = require('./src/meta')

const plugins = [
	'gatsby-plugin-styled-jsx-postcss',
	'gatsby-plugin-sharp',
	'gatsby-transformer-sharp',
	'gatsby-plugin-react-helmet',
	'gatsby-plugin-remove-trailing-slashes',
	'gatsby-plugin-snipcart',
	'gatsby-plugin-mobx',
	'gatsby-plugin-page-load-delay',
	{
		resolve: 'gatsby-plugin-canonical-urls',
		options: {
			siteUrl: 'https://gatsby-boilerplate.netlify.com',
		},
	},
	{
		resolve: 'gatsby-transformer-remark',
		options: {
			plugins: [
				'gatsby-remark-prismjs',
				'gatsby-remark-copy-linked-files',
				'gatsby-remark-smartypants',
			],
		},
	},
	{
		resolve: 'gatsby-source-filesystem',
		options: {
			name: 'markdown',
			path: `${__dirname}/src/markdown`,
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
		resolve: 'gatsby-plugin-favicon',
		options: {
			logo: './src/img/icon.png',
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
				windows: false
			}
		}
	},
	/*
	{
		resolve: '@andrew-codes/gatsby-plugin-elasticlunr-search',
		options: {
			fields: [
				'title',
				'id',
				'pageId',
				'type',
				'slug',
				'splitSlug',
				//'html',
			],
			resolvers: {
				MarkdownRemark: {
					title: node => node.frontmatter.title,
					id: node => node.fields.slug,
					splitSlug: node => node.fields.slug.split('/'),
					pageId: node => node.frontmatter.id,
					type: node => node.frontmatter.type,
					//html: node => matter(node.internal.content).content,
				}
			}
		}
	},
	*/
	/*
	{
		resolve: 'gatsby-plugin-google-fonts',
		options: {
			fonts: [
          'limelight',
          'source sans pro\:300,400,400i,700',
			]
		}
	},
	*/
	{
		resolve: 'gatsby-plugin-sitemap',
		options: {
			serialize: ({ site, allSitePage }) => {
				allSitePage.edges = allSitePage.edges.filter((edge) => {
					if ([
						// Excluded pages from sitemap
						'/404',
						'/offline-plugin-app-shell-fallback',
					].indexOf(edge.node.path) === -1) return true
					return false
				})
				return allSitePage.edges.map(edge => {
					// Remove trailing slash
					let path = edge.node.path.split('/')
					if (!path[path.length - 1]) path.pop()
					path = path.join('/')
					return {
						url: site.siteMetadata.siteUrl + path,
						changefreq: `daily`,
						priority: 0.7,
					}
				})
			}
		}
	},
	'gatsby-plugin-manifest',
]

if (process.env.SALSIFY_API_KEY){
	plugins.push({
		resolve: 'gatsby-source-salsify',
		options: {
			//ids: ['U2508', 'U2000'],
			markdownPath: `${__dirname}/src/markdown/products`,
			apiKey: process.env.SALSIFY_API_KEY,
			types: {
				webImages: 'array'
			},
			media: [
				'webImages'
			],
		},
	})
}

if (process.env.GOOGLE_ANALYTICS_ID){
	plugins.push({
		resolve: 'gatsby-plugin-google-analytics',
		options: {
			trackingId: process.env.GOOGLE_ANALYTICS_ID
		}
	})
}
else{
	console.log('No Google Analytics ID found')
}

module.exports = {
	siteMetadata: meta,
	plugins: plugins,
}
