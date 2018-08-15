const downloadCSS = require(`./download-css`)
const downloadFonts = require(`./download-fonts`)

exports.onPreBootstrap = async (_, options) => {
	await downloadCSS(options)
	await downloadFonts()
}