'use strict'
require('dotenv').config({ silent: true })
const sync = require('./sync')
const exec = require('child-process-promise').exec
const sitemap = require('./sitemap')
const copy = require('./copy')
const replaceImages = require('../images/replace-images')
const compressImages = require('../images/compress')

console.log('Building static files...')
sync()
	.then(() => {
		console.log('Building Next.js app...')
		return exec('next build')
	})
	.then(() => {
		console.log('Exporting Next.js static files...')
		return exec('next export -o dist')
	})
	.then(() => Promise.all([
		replaceImages().then(compressImages),
		sitemap(),
		copy(),
		exec('html-minifier --input-dir ./dist --output-dir ./dist --file-ext html --config-file ./config/.htmlmin')
	]))

	.then(() => console.log('Done building!'))
	.catch(err => {
		throw err
		process.exit(1)
	})