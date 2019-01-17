import { parse } from 'cookie'

export function handler(req, _, callback){

	const { nf_jwt } = parse(req.headers.cookie)
	console.log(`jwt`, nf_jwt)
	console.log(process.env)

	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}