const { join } = require(`path`)
const path = join(process.cwd(), `../../.env`)
require(`dotenv-override`).config({
	path,
	silent: true,
	override: true,
})
module.exports = process.env