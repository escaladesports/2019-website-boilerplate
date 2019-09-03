require(`./env`)
const { join } = require(`path`)
const { readFile, outputFile } = require(`fs-extra`)
const { argv } = require(`yargs`)

const cwd = process.cwd()

async function patchNetlifyConfig(src = `/`, dest) {
	console.log(`patchNetlifyConfig`)
	src = join(cwd, src, `netlify.toml`)
	console.log(src, dest)
	const buffer = await readFile(src)
	let contents = buffer.toString()
	const matches = contents.match(/env\.(.*)/g)
	matches.forEach(match => {
		const parts = match.replace(`env.`, ``).split(/[\W]+/)
		const key = parts[0]
		const value = process.env[key] || ``
		contents = contents.replace(`env.${key}`, value)
	})
	if (dest) {
		dest = join(cwd, dest, `netlify.toml`)
		await outputFile(dest, contents)
	}
	return contents
}

const { src, dest } = argv
if(src && dest){
	patchNetlifyConfig(src, dest, false)
}

module.exports = patchNetlifyConfig