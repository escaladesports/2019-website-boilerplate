'use strict'
const path = require('path')
const fs = require('fs-extra')
const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const pagination = require('metalsmith-pagination')
const json = require('metalsmith-to-json')

module.exports = () => {
	if (!process.env.ENABLE_POSTS) {
		return Promise.resolve()
	}
	console.log('Converting markdown posts to JSON...')
	return Metalsmith('./')
		.source('markdown/posts')
		.destination('./json/markdown/posts')
		.use(markdown())
		.use((files, metalsmith, done) => {
			const keys = Object.keys(files)
			keys.sort((a, b) => {
				a = Object.assign({}, files[a])
				b = Object.assign({}, files[b])
				if (a.date < b.date) {
					return 1
				}
				else if (a.date > b.date) {
					return -1
				}
				else if (a.stats.ctime < b.stats.ctime) {
					return 1
				}
				else if (a.stats.ctime > b.stats.ctime) {
					return -1
				}
				return 0
			})
			for (let i = keys.length; i--;) {
				let key = keys[i]
				key = path.parse(key)
				delete key.ext
				key.base = key.base.split('.')
				key.base.pop()
				key.base = key.base.join('.')
				key = path.format(key)
				keys[i] = key
			}
			fs.outputJson('./json/markdown/posts.json', keys, {spaces: '\t'})
				.then(done)
				.catch(console.error)
		})
		.use(json({
			outputPath: ''
		}))
		.build(err => {
			if (err) return console.error(err)
			console.log('Posts converted to JSON.')
		})

}