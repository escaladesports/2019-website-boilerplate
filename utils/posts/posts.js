'use strict'
const createPosts = require('./create-posts')
const createTags = require('./create-tags')

module.exports = () => {
	if (!process.env.ENABLE_POSTS) {
		return Promise.resolve()
	}
	console.log('Converting markdown posts to JSON...')
	return createPosts()
		.then(createTags)
}