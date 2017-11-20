import env from 'json/env.json'

export default function() {
	if (!global.jsonToEnvInit){
		global.jsonToEnvInit = true
		if (!process) process = {}
		if (!('env' in process)) process.env = {}
		if (!('process' in global)) global.process = {}
		if (!('env' in global.process)) global.process.env = {}
		for(let i in env){
			process.env[i] = env[i]
			global.process.env[i] = env[i]
		}
	}
}