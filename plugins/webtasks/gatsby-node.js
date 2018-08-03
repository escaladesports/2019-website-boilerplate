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
	cron = {},
	timezone = `UTC`,
}) => {
	path = `${path}/**/*.js`
	const files = await glob(path)

	if(secrets){
		let parsedSecrets = []
		for(let i in secrets){
			parsedSecrets.push(`--secret ${i}=${secrets[i]}`)
		}
		secrets = parsedSecrets.join(` `)
	}

	for (let i = files.length; i--;) {
		const filePath = files[i]
		const taskName = `${prefix}${parse(filePath).name}`
		console.log(`Deploying webtask "${taskName}"...`)
		let cmd = [ `wt` ]
		if (cron[taskName]) {
			cmd.push(`cron`)
		}
		cmd.push(`create`)
		if(cron[taskName]){
			const schedule = typeof cron[taskName] === `string`
				? cron[taskName]
				: `0 0 * * *`
			cmd.push(
				`--schedule "${schedule}"`,
				`--tz ${timezone}`,
			)
		}
		cmd.push(
			`"${filePath}"`,
			`--bundle`,
			`--container "${container}"`,
			`--url "${url}"`,
			`--token "${token}"`,
			`--name "${taskName}"`,
		)
		if(secrets){
			cmd.push(secrets)
		}
		cmd = cmd.join(` `)
		console.log(cmd)
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
}
