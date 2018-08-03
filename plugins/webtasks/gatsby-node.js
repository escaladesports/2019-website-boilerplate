const { parse } = require(`path`)
const glob = require(`globby`)
const { spawn } = require(`child-process-async`)

exports.onPreBuild = async (_, {
	path,
	url = `https://sandbox.auth0-extend.com`,
	container,
	token,
	prefix,
	secrets,
}) => {
	path = `${path}/**/*.js`
	const files = await glob(path)

	if(secrets){
		let parsedSecrets = []
		for(let i in secrets){
			parsedSecrets.push(` --secret ${i}=${secrets[i]}`)
		}
		secrets = parsedSecrets.join()
	}

	for (let i = files.length; i--;) {
		const filePath = files[i]
		const taskName = `${prefix}${parse(filePath).name}`
		console.log(`Deploying webtask "${taskName}"...`)
		const cmd = `wt create "${filePath}" --bundle --container "${container}" --url "${url}" --token "${token}" --name "${taskName}"${secrets}`
		try {
			await spawn(cmd, [], {
				shell: true,
				stdio: `inherit`,
			})
		}
		catch(err){
			console.error(err)
			process.exit(1)
		}
		console.log(`Deployed webtask "${taskName}"`)
	}

	process.exit(0)
}
