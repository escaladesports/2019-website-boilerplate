'use strict'
const cpy = require('cpy')

module.exports = () => {
	console.log('Copying files...')
	return Promise.all([
			cpy([
				'config/netlify.toml'
			], 'dist'),
			cpy(['admin/**/*'], 'dist/admin'),
			cpy(['uploads/**/*'], 'dist/uploads')
		])
		.then(() => console.log('Files copied.'))
}

