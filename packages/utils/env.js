const { join } = require(`path`)
const path = join(__dirname, `../../.env`)
console.log(`Env path`, path)
require(`dotenv-override`).config({
	path,
	silent: false,
	override: true,
})
module.exports = process.env