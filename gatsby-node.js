require('dotenv').config({ silent: true })
const Promise = require(`bluebird`)
const path = require('path')

// Removes trailing slash
exports.onCreatePage = ({ page, boundActionCreators }) => {
	const { createPage, deletePage } = boundActionCreators
	return new Promise((resolve, reject) => {
		const newPage = Object.assign({}, page, {
			path: page.path === `/` ? page.path : page.path.replace(/\/$/, ``),
		})
		if (newPage.path !== page.path) {
			deletePage(page)
			createPage(newPage)
		}
		resolve()
	})
}

// Create dynamic page test
exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators
	createPage({
		path: '/home',
		component: path.resolve('src/pages/index.js'),
		context: {
			productId: 7
		}
	})
}