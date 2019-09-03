require(`./env`)
const { join } = require(`path`)
const { readFile, outputFile } = require(`fs-extra`)

const cwd = process.cwd()
const src = join(cwd, `../config/netlify.toml`)
const dest = join(cwd, `../../netlify.toml`)

async function go(){
	const buffer = await readFile(src)
	let contents = buffer.toString()
	const matches = contents.match(/env\.(.*)/g)
	matches.forEach(match => {
		const parts = match.replace(`env.`, ``).split(/[\W]+/)
		const key = parts[0]
		const value = process.env[key] || ``
		contents = contents.replace(`env.${key}`, value)
	})
	await outputFile(dest, contents)
}

try {
	go()
}
catch(err){
	console.error(err)
	process.exit(1)
}