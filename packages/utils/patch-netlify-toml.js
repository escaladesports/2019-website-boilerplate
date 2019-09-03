require(`./env`)
const { join } = require(`path`)
const { readFile, outputFile } = require(`fs-extra`)

const cwd = process.cwd()
const src = join(cwd, `../config/netlify.toml`)
const dest = join(cwd, `../../netlify.toml`)

async function go(){
	const buffer = await readFile(src)
	let contents = buffer.toString()
	console.log(`NETLIFY.TOML CONTENTS`, contents)
	const matches = contents.match(/env\.(.*)/g)
	matches.forEach(match => {
		console.log(`MATCH`, match)
		const parts = match.replace(`env.`, ``).split(/[\W]+/)
		const key = parts[0]
		const value = process.env[key] || ``
		console.log(`TYPEOF CONTENTS`, typeof contents)
		console.log(`Replacing env.${key} with ${value}`)
		contents = contents.replace(`env.${key}`, value)
		console.log(`Succeeded replacing env.${key} with ${value}`)
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