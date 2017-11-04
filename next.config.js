'use strict'
require('dotenv').config({ silent: true })
const fs = require('fs-extra')
const glob = require('globby')
const path = require('path')

module.exports = {
	poweredByHeader: false,
	exportPathMap: () => {
		const pages = {}
		let templatePages = [
			'/_document',
			'/index',
			'/category',
			'/product',
			'/post'
		]

		return Promise.resolve()

			// Home page
			.then(() => {
				pages['/'] = { page: '/' }
			})

			// Product & category pages
			.then(() => fs.readJson('./json/product/all.json'))
			.then(products => {
				for (let i in products) {
					const product = products[i]
					if (product.render === false) continue

					// Category
					let categoryPath = `/category/${product.category}`
					if (!pages[categoryPath]) {
						pages[categoryPath] = {
							page: '/category',
							query: { id: product.category }
						}
					}

					// Product
					pages[`/product/${product.id}`] = {
						page: '/product',
						query: { id: product.id }
					}

				}
				return products
			})



			// Markdown pages
			.then(() => glob(['./json/markdown/pages/*.json']))
			.then(markdown => {
				markdown.forEach(file => {
					const obj = require(file)
					const id = path.parse(file).name
					let permalink = obj.permalink || `/${id}`
					if (permalink[0] !== '/') {
						permalink = `/${permalink}`
					}
					let template = '/page'
					if (obj.template) template = `/${obj.template}`
					if(templatePages.indexOf(template) === -1){
						templatePages.push(template)
					}
					pages[permalink] = {
						page: template,
						query: {
							id: id
						}
					}
				})
			})


			// Component pages
			.then(() => glob('./pages/*.js'))
			.then(files => {
				files.forEach(file => {
					let pageId = `/${path.parse(file).name}`
					if (templatePages.indexOf(pageId) === -1) {
						pages[pageId] = {
							page: pageId
						}
					}
				})
			})

			// Posts
			/*
			.then(() => {
				if(!process.env.ENABLE_POSTS){
					return Promise.resolve()
				}
				return glob('./json/')
			})
			*/

			//.then(() => console.log('Routes:', pages))
			.then(() => pages)
			.catch(console.error)
	},
	webpack: (config, obj) => {
		config.module.rules.push(
			{
				test: /\.css$/,
				loader: 'emit-file-loader',
				options: {
					name: 'dist/[path][name].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: [
					'babel-loader',
					'raw-loader',
					'postcss-loader'
				]
			}
		)
		return config
	}
}
