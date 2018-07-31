import { spawn } from 'child-process-promise'
import {
	remove,
	pathExists,
} from 'fs-extra'
import rename from './rename'

async function resetGit() {
	if (!await pathExists(`.git`)) {
		return console.log(`No .git directory found`)
	}
	console.log(`Resetting git...`)
	await remove(`.git`)
	await spawn([
		`git init`,
		`git add .`,
		`git commit -m "Initial commit"`,
	].join(` && `), [], {
		shell: true,
		stdio: `inherit`,
	})
}

async function reset(options){
	await rename(options)
	await resetGit()
}

export default reset