const fonts = require(`./fonts`)
const colors = require(`./colors`)

module.exports = {
	siteUrl: process.env.URL || `https://escalade.netlify.com`,
}
exports.fonts = fonts
exports.colors = colors