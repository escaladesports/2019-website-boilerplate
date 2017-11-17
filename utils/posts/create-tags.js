'use strict'
const glob = require('globby')
const fs = require('fs-extra')

module.exports = () => {
	console.log('Creating tag JSON files...')
	return glob('./json/posts/**/*.json')
		// Read JSON
		.then(files => {
			const promises = files.map(path => fs.readJson(path))
			return Promise.all(promises)
		})
		// Create tag data
		.then(files => {
			const tags = {}
			files.forEach(file => {
				if(file.tags){
					file.tags.forEach(tag => {
						if(!(tag in tags)){
							tags[tag] = []
						}
						tags[tag].push(file)
					})
				}
			})
			return tags
		})
		// Save tag files
		.then(tags => {
			const promises = []
			for(let i in tags){
				promises.push(fs.outputJson(`./json/post-tags/${i}.json`, tags[i], { spaces: '\t' }))
			}
			return Promise.all(promises)
		})
		.then(() => console.log('Done creating tag JSON files.'))
}