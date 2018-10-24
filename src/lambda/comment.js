import dotEnv from 'dotenv'
import Octokit from '@octokit/rest'
import { stringify } from 'yaml'
const octokit = Octokit()
dotEnv.config({ silent: true })

const allowed = [
	`name`,
	`email`,
	`comment`,
	`slug`,
]
const required = [
	`name`,
	`email`,
	`comment`,
	`slug`,
]

export async function handler({ body }){

	try{
		const input = JSON.parse(body)
		const data = {}

		// Validate user input
		for(let i = 0; i <= required.length; i++){
			const name = required[i]
			if (!(name in input)) {
				return {
					statusCode: 200,
					body: JSON.stringify({
						success: false,
						message: `Form could not be submit. Missing required fields.`,
					}),
				}
			}
		}

		// Filter to only accepted values
		let comment = ``
		for(let i in input){
			if (allowed.indexOf(i) > -1) {
				if(i === `comment`){
					comment = input[i]
				}
				else {
					data[i] = input[i]
				}
			}
		}

		// Add generated data
		data.date = (new Date()).toISOString()
		data.published = false

		const markdownData = `---\n${stringify(data)}---\n\n${comment}`

		octokit.authenticate({
			type: `token`,
			token: process.env.GITHUB_API_TOKEN,
		})
		console.log(`Octokit authenticated...`)
		await octokit.repos.createFile({
			owner: `escaladesports`,
			repo: `project-boilerplate`,
			ref: `master`,
			path: `src/markdown/comments/${data.date}.md`,
			message: `User generated comment`,
			content: Buffer.from(markdownData).toString(`base64`),
		})
		console.log(`File created in repo...`)
		return {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
		}
	}
	catch(err){
		console.error(err)
		return {
			statusCode: 200,
			body: JSON.stringify({ success: false }),
		}
	}
}