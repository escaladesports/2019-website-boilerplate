'use strict'
const fs = require('fs-extra')
const sharp = require('sharp')

module.exports = (src, options) => {

	return new Promise((resolve, reject) => {

		// Find potential queries
		let queries = {}
		let parts = src.split('/')
		let queryPaths = []
		let srcPath = []
		if(!parts[0]) parts.shift()
		parts.forEach((part, key) => {
			let found = false
			if(part.indexOf('w_') === 0){
				let n = Number(part.replace('w_', ''))
				if (n) {
					found = true
					queries.w = n
				}
			}
			if(part.indexOf('h_') === 0){
				let n = Number(part.replace('h_', ''))
				if (n) {
					found = true
					queries.h = n
				}
			}
			if(!found && key){
				srcPath.push(part)
			}
		})
		srcPath = srcPath.join('/')
		srcPath = `${options.cwd}/${srcPath}`

		// Check if image exists
		let dist = options.dist ? '/dist' : ''
		let fullDest = `${options.cwd}${dist}${src}`
		fs.pathExists(fullDest)
			.then(exists => {
				// Do nothing if it already exists
				if (exists) {
					resolve(src)
				}
				else {
					// If image transformations
					if (Object.keys(queries).length) {
						console.log('Ensuring path exists', fullDest)
						fs.ensureFile(fullDest)
							.then(() => {
								console.log('Processing image', srcPath)
								sharp(srcPath)
									.resize(queries.w, queries.h)
									.toFile(fullDest)
									.then(() => resolve(src))
									.catch(reject)
							})
							.catch(reject)
					}
					// Else just copy it to static
					else{
						console.log('Copying file', fullDest)
						fs.copy(srcPath, fullDest)
							.then(() => resolve(src))
							.catch(() => resolve(src))
					}
				}
			})
	})

}