'use strict'
const path = require('path')
const Metalsmith = require('metalsmith')
const markdown = require('metalsmith-markdown')
const json = require('metalsmith-to-json')

module.exports = () => {
	return new Promise((resolve, reject) => {
		Metalsmith('./')
			.source('markdown/posts')
			.destination('./json/posts')
			.use(markdown())
			// Format posts
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
				let newObj = {}
				for (let i in files) {
					newObj[files[i].permalink + '.html'] = files[i]
					delete files[i]
				}
				for (let i in newObj) {
					files[i] = newObj[i]
				}
				done()
			})
			.use(json({
				outputPath: ''
			}))
			.build(err => {
				if (err) return reject(err)
				console.log('Posts converted to JSON.')
				return resolve()
			})
	})
}