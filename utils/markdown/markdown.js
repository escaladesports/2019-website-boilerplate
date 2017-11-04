'use strict'
const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const json = require('metalsmith-to-json')
const fs = require('fs-extra')

module.exports = (cwd, src, out) => {
	console.log('Outputting markdown to JSON...')
	return new Promise((resolve, reject) => {
		fs.pathExists('markdown/pages')
			.then(exists => {
				if(!exists){
					console.log('No markdown pages found')
					return resolve()
				}
				Metalsmith('./')
					.clean(false)
					.source('markdown/pages')
					.destination('./json/markdown/pages')
					.use(markdown())
					.use(json({ outputPath: '' }))
					.build(err => {
						if (err) return reject(err)
						console.log('Output markdown to JSON.')
						resolve()
					})
			})
	})
}
