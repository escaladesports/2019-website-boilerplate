'use strict'
const glob = require('globby')
const fs = require('fs-extra')
const transform = require('./transform-image')
const additionalImages = require('../../config/process-images')

let paths
let contents
let regLinks = /\/static\/(.*?)('|"|\)| |\&)/gi
let regRemove = /('|"|\)| |\&)/g

module.exports = () => {
	console.log('Transforming found images...')
	return glob([
			'dist/**/*.js',
			'dist/**/*.css',
			'dist/**/*.html'
		])

		// Get file data
		.then(res => {
			console.log('Reading files for image paths...')
			paths = res
			return Promise.all(paths.map(path => fs.readFile(path, 'utf-8')))
		})

		// Extract image URLs
		.then(res => {
			console.log('Extracting image paths...')
			contents = res
			let found = []
			contents.forEach(str => {
				let matches = str.match(regLinks) || []
				matches = matches.forEach(match => {
					match = match.replace(regRemove, '')
					if (
						found.indexOf(match) === -1 &&
						match.split('/').pop().indexOf('.') > -1
					) {
						found.push(match)
					}
				})
			})
			found = found.concat(additionalImages)
			return found
		})

		// Image operations
		.then(paths => {
			console.log('Performing image operations...')
			let dir = __dirname.split('/')
			dir.pop()
			dir.pop()
			dir = dir.join('/')
			console.log(`Reading images from ${dir}`)
			let promises = paths.map(path => {
				console.log(`Transforming ${path}`)
				return transform(path, {
					cwd: dir,
					dist: true
				})
			})
			return Promise.all(promises)
		})

		.then(() => console.log('Done transforming images.'))
}