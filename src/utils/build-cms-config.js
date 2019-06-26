require(`dotenv`).config({ silent: true })
const { readFile, outputFile } = require(`fs-extra`)
const glob = require(`globby`)
const { join } = require(`path`)
const { parse, stringify } = require(`yaml`)

const cwd = process.cwd()
const configPath = `src/cms-config`
const indexPath = join(cwd, configPath, `index.yml`)
const outputPath = join(cwd, `static/admin/config.yml`)
const defaultVars = {
	BRANCH: `master`,
}

async function buildCMSConfig(){
	// Get config contents
	const files = await glob([
		join(cwd, configPath, `**/*.yml`),
		`!${indexPath}`,
	])
	const contents = await Promise.all(files.map(path => {
		return readFile(path)
	}))
	const indexBuffer = await readFile(indexPath)

	// Create final config string
	const config = parse(indexBuffer.toString())
	config.collections = []
	contents.forEach(buffer => {
		const str = buffer.toString()
		config.collections.push(parse(str))
	})
	let configStr = stringify(config)

	// Replace environment variables
	const matches = configStr.match(/env\.(.*)/g)
	matches.forEach(match => {
		const parts = match.replace(`env.`, ``).split(/[\W]+/)
		const key = parts[0]
		const value = process.env[key] || defaultVars[key] || ``
		configStr = configStr.replace(`env.${key}`, value)
	})

	await outputFile(outputPath, configStr)
}

try {
	buildCMSConfig()
}
catch(err){
	console.error(err)
	process.exit(1)
}