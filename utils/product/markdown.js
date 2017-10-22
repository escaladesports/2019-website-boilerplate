'use strict'
const matter = require('gray-matter')
const fs = require('fs-extra')
const glob = require('globby')

module.exports = () => {
	console.log('Reading product markdown files...')
	// Read files
	return glob('./markdown/product/**/*.md')
		.then(paths => {
			return Promise.all(paths.map(path => fs.readFile(path)))
		})
		// Create objects
		.then(contents => {
			console.log('Creating markdown product objects...')
			contents = contents.map(prod => {
				prod = prod.toString()
				prod = matter(prod)
				delete prod.excerpt
				prod = Object.assign({}, prod, prod.data)
				delete prod.data
				return prod
			})
			return contents
		})
		// Create variants
		.then(contents => {
			let obj = {}
			contents.forEach(prod => {
				if(!prod.id) return
				let productSet = {}
				let parent = prod
				if(Array.isArray(parent.variants)){
					parent.variants.forEach(variant => {
						variant = Object.assign({}, parent, variant)
						delete parent.variants
						delete variant.variants
						productSet[variant.id.toLowerCase()] = variant
					})
				}
				delete parent.variant
				productSet[parent.id.toLowerCase()] = parent


				// Create variants for everything in set
				for(let i in productSet){
					let prod = productSet[i]
					prod.variants = []
					for(let i in productSet){
						if(productSet[i].id !== prod.id){
							prod.variants.push(productSet[i].id)
						}
					}
				}
				obj = Object.assign(obj, productSet)
			})
			return obj
		})

		// Save JSON files
		.then(obj => {
			console.log('Saving markdown product JSON files...')
			const promises = []
			for(let i in obj){
				promises.push(fs.outputJson(`./json/markdown/product/${i}.json`, obj[i], { spaces: '\t' }))
			}
			return Promise.all(promises)
		})

		.then(obj => console.log('Done saving product markdown JSON.'))

}
