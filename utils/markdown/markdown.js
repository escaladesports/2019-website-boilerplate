'use strict'
const markdown = require('markdown-to-json-files')
module.exports = () => {
	console.log('Outputting markdown to JSON...')
	return markdown('./', `markdown/pages`, './json/markdown/pages')
		.then(() => console.log('Output markdown to JSON.'))
}

