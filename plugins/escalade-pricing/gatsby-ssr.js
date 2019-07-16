const React = require(`react`)

console.log(`gatsby-ssr.js`)

exports.replaceRenderer = ({ setPostBodyComponents }) => {
	console.log(`replaceRenderer`)

	setPostBodyComponents([
		<div key='test'>TEST</div>,
	])

}