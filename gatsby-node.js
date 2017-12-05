const Promise = require(`bluebird`)

exports.onCreatePage = ({ page, boundActionCreators }) => {
	const { createPage, deletePage } = boundActionCreators
	return new Promise((resolve, reject) => {
		// Remove trailing slash
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
