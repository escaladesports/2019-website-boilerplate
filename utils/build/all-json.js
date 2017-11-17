'use strict'
const glob = require('globby')
const fs = require('fs-extra')

// Get all JSON paths
let files = []
let dirs = []
let contents = {}
function removeAllJson(arr){
	return arr.filter(path => {
		if (path.split('/').pop() === 'all.json') {
			return false
		}
		return true
	 })
}
module.exports = () => {
	console.log('Writing all.json files...')
	return glob([
			'json/product/**/*.json'
		])

		// Get all file contents
		.then(list => {
			// Get rid of old all.json files
			list = removeAllJson(list)
			files = list
			const promises = list.map(path => fs.readJson(path))
			return Promise.all(promises)
		})
		.then(list => {
			files.forEach((path, i) => {
				contents[path] = list[i]
			})
		})

		// Get all directories
		.then(() => {
			files.forEach(file => {
				file = file.split('/')
				file.pop()
				let path = file.shift()
				if (dirs.indexOf(path) === -1) {
					dirs.push(path)
				}
				while (file.length) {
					path = `${path}/${file.shift()}`
					if (dirs.indexOf(path) === -1) {
						dirs.push(path)
					}
				}
			})
			return dirs
		})

		// Get only the files in those directories
		.then(dirs => {
			const promises = dirs.map(dir => {
				return glob([
					`${dir}/**/*.json`
				])
			})
			return Promise.all(promises)
		})
		.then(contents => {
			const obj = {}
			contents.forEach((files, key) => {
				files = removeAllJson(files)
				obj[dirs[key]] = files
			})
			return obj
		})

		// Assemble file contents
		.then(obj => {
			for (let i in obj) {
				obj[i] = obj[i].map(path => {
					return contents[path]
				})
			}
			return obj
		})

		// Write files
		.then(obj => {
			const promises = []
			for (let i in obj) {
				promises.push(fs.outputJson(`${i}/all.json`, obj[i], { spaces: '\t' }))
			}
			return Promise.all(promises)
		})


		.then(() => console.log('Done writing all.json files!'))
}
