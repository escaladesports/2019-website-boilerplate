import dotEnv from 'dotenv'
import Octokit from '@octokit/rest'
const octokit = Octokit()
dotEnv.config({ silent: true })

export async function handler({ body }, _, callback){
	try{
		body = JSON.parse(body)
		console.log(body)
		octokit.authenticate({
			type: `token`,
			token: process.env.GITHUB_API_TOKEN,
		})
		const res = await octokit.repos.createFile({
			owner: `escaladesports`,
			repo: `project-boilerplate`,
			ref: `master`,
			path: `src/markdown/test.md`,
			message: `Test createFile`,
			content: Buffer.from(`---\ntest: true\n---`).toString(`base64`),
		})
		console.log(`RESULT`, res)
		callback(null, {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
		})
	}
	catch(err){
		console.error(`ERROR`, err)
		callback(null, {
			statusCode: 200,
			body: JSON.stringify({ success: false }),
		})
		process.exit(0)
	}
}