const { join } = require(`path`)
const path = join(__dirname, `../../.env`)
require(`dotenv-override`).config({
	path,
	silent: true,
	override: true,
})
module.exports = process.env