'use strict'
const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const json = require('metalsmith-to-json')

module.exports = (cwd, src, out) => {
	console.log('Outputting markdown to JSON...')
	return new Promise((resolve, reject) => {
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
}
