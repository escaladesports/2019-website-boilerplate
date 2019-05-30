require(`dotenv`).config({ silent: true })
const { readFile, outputFile } = require(`fs-extra`)

const cwd = process.cwd()

async function go(){
	const buffer = await readFile(`${cwd}/src/netlify.toml`)
	let contents = buffer.toString()
	const matches = contents.match(/env\.(.*)/g)
	matches.forEach(match => {
		const parts = match.replace(`env.`, ``).split(/[\W]+/)
		const key = parts[0]
		const value = process.env[key] || ``
		contents = contents.replace(`env.${key}`, value)
	})
	await outputFile(`${cwd}/netlify.toml`, contents)
}

try {
	go()
}
catch(err){
	console.error(err)
	process.exit(1)
}