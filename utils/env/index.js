//import fetch from 'isomorphic-fetch'
const { readFile } = require(`fs-extra`)
const homedir = require(`os`).homedir()

async function fetchToken(){
	const keyPath = `${homedir}/.config/netlify`
	let key
	try{
		key = await readFile(keyPath, `utf8`)
		key = JSON.parse(key).access_token
	}
	catch(err){
		console.error(`Can't find key in "${keyPath}"\nPlease install and login with "netlifyctl" CLI`)
	}
	return key
}

async function fetchEnv(key){
	console.log(key)
}

async function go(){
	const key = await fetchToken()
	const env = await fetchEnv(key)
	console.log(env)
}

go()