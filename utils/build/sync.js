'use strict'
require('dotenv').config({ silent: true })
const clean = require('./clean')
const markdown = require('../markdown/markdown')
const productMarkdown = require('../product/markdown')
const markdownModules = require('../markdown/markdown-modules')
const salsify = require('../salsify/salsify')
const mergeProduct = require('../product/merge-product-data')
const allJson = require('./all-json')
const env = require('./env')
const posts = require('../posts/posts')

// Sync data
module.exports = () => {
	console.log('Syncing data...')
	return clean()
		.then(() => env())
		.then(() => Promise.all([
			markdown(),
			productMarkdown(),
			markdownModules('privacy-policy'),
			markdownModules('terms-of-service'),
			posts()
		]))
		.then(() => salsify())
		.then(() => mergeProduct())
		.then(() => allJson())
}