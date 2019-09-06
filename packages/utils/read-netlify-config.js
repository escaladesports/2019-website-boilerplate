require(`./env`)
const { join } = require(`path`)
const { readFileSync } = require(`fs-extra`)
const { parse } = require(`toml`)

const cwd = process.cwd()

module.exports = function readNetlifyConfig(src = `/`) {
	src = join(cwd, src, `netlify.toml`)
	const buffer = readFileSync(src)
	let contents = buffer.toString()
	const matches = contents.match(/env\.(.*)/g)
	matches.forEach(match => {
		const parts = match.replace(`env.`, ``).split(/[\W]+/)
		const key = parts[0]
		const value = process.env[key] || ``
		contents = contents.replace(`env.${key}`, value)
	})
	contents = parse(contents)
	return contents
}