/* eslint-disable no-empty */
const { join } = require(`path`)
const fetch = require(`isomorphic-fetch`)
const { readJson, readFile, outputFile } = require(`fs-extra`)
const homedir = require(`os`).homedir()

const cwd = process.cwd()
const keyPaths = [
	join(homedir, `.config/netlify`),
	join(homedir, `.netlify/config`),
]

async function fetchToken(){
	let key

	for(let path of keyPaths){
		try{
			let contents = await readFile(path, `utf8`)
			contents = JSON.parse(contents).access_token
			if(contents){
				key = contents
			}
		}
		catch(err){}
	}
	if(!key){
		console.error(`Can't find key\nPlease install and login with Netlify CLI`)
	}
	return key
}

async function fetchId(){
	let id
	try{
		const { siteId } = await readJson(`${cwd}/.netlify/state.json`)
		if (siteId){
			id = siteId
		}
	}
	catch(err){
		console.error(`Can't find site ID`)
	}
	return id
}

async function fetchEnv(token, id){
	let env
	try{
		let data = await fetch(`https://api.netlify.com/api/v1/sites/${id}.netlify.com?access_token=${token}`)
		data = await data.json()
		env = data.build_settings.env
	}
	catch(err){
		console.error(err)
		console.error(`Can't fetch environment from Netlify`)
	}
	return env
}

async function writeDotenv(env){
	const contents = []
	for(let key in env){
		const val = env[key].replace(/"/g, `\\"`)
		contents.push(`${key} = "${val}"`)
	}
	await outputFile(`${cwd}/.env`, contents.join(`\n`))
}

async function go(){
	const token = await fetchToken()
	const id = await fetchId()
	const env = await fetchEnv(token, id)
	await writeDotenv(env)
}

go()