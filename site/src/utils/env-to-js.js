require(`dotenv-override`).config({
	silent: true,
	override: true,
})
const { outputFile } = require(`fs-extra`)
const { join } = require(`path`)

const outputPath = join(process.cwd(), `.env.js`)

!async function envToJs(){
	const arr = []
	for(let key in process.env){
		const val = process.env[key]
		if(key.indexOf(`GATSBY_`) !== 0){
			continue
		}
		arr.push(`\t"${key}": "${val.replace(/"/g, `\\"`)}",`)
	}
	await outputFile(outputPath, `module.exports={\n${arr.join(`\n`)}\n}`)
}()