'use strict'
const fs = require('fs-extra')
module.exports = () => {
	console.log('Cleaning JSON directory...')
	return Promise.all([
			fs.remove('json'),
			fs.remove('static'),
			fs.remove('dist')
		])
		.then(() => console.log('Cleaned JSON directory.'))
}