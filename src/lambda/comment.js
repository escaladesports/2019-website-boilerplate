import dotEnv from 'dotenv'
import Octokit from '@octokit/rest'
import { stringify } from 'yaml'
const octokit = Octokit()
dotEnv.config({ silent: true })

const allowed = [
	`name`,
	`email`,
	`comment`,
]
const required = [
	`name`,
	`email`,
	`comment`,
]

export async function handler({ body }, _, callback){

	function done(obj) {
		callback(null, {
			statusCode: 200,
			body: JSON.stringify(obj),
		})
		process.exit(0)
	}

	try{
		body = JSON.parse(body)
		const input = body.data
		const data = {}

		// Validate user input
		required.forEach(name => {
			if (!(name in input)) {
				done({
					success: false,
					message: `Form could not be submit. Missing required fields.`,
				})
			}
		})

		// Filter to only accepted values
		for(let i in input){
			if (allowed.indexOf(i) > -1) {
				data[i] = input[i]
			}
		}

		// Add generated data
		data.timestamp = Date.now()
		data.published = false

		octokit.authenticate({
			type: `token`,
			token: process.env.GITHUB_API_TOKEN,
		})
		await octokit.repos.createFile({
			owner: `escaladesports`,
			repo: `project-boilerplate`,
			ref: `master`,
			path: `src/markdown/comments/${data.timestamp}.md`,
			message: `User generated comment`,
			content: Buffer.from(`---\n${stringify(data)}---`).toString(`base64`),
		})
		done({ success: true })
	}
	catch(err){
		console.error(err)
		done({ success: false })
	}
}