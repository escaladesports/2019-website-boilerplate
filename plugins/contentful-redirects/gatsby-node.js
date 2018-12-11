const redirects = require(`.cache/contentful-redirects.json`)

exports.createPages = ({ actions: { createRedirect } }) => {
	redirects.map(createRedirect)
}