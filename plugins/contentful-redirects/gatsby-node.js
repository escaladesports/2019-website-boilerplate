const redirects = require(`.cache/contentful-redirects.json`)

exports.createPages = ({ actions: { createRedirect } }) => {
	console.log(`REDIRECTS`, redirects)
	redirects.map(data => {
		console.log(`\n`, `REDIRECT:`, data)
		return createRedirect(data)
	})
}