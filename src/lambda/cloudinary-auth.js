import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

const { JWT_SIGNING_SECRET } = process.env

export function handler(body, context, callback){

	// console.log(`BODY`, body)
	// console.log(`CONTEXT`, context)

	const { nf_jwt } = parse(body.headers.cookie)

	console.log(
		`bodyRes with secret`,
		jwt.verify(nf_jwt, JWT_SIGNING_SECRET)
	)

	// console.log(
	// 	`contextRes with secret`,
	// 	jwt.verify(context.clientContext.identity.token, JWT_SIGNING_SECRET)
	// )


	try {
		console.log(
			`bodyRes with bunk`,
			jwt.verify(nf_jwt, `asdf`)
		)
	}
	catch(err){
		console.error(err)
	}

	try {
		console.log(
			`bodyRes with nothing`,
			jwt.verify(nf_jwt)
		)
	}
	catch (err) {
		console.error(err)
	}
	// console.log(
	// 	`contextRes with bunk`,
	// 	jwt.verify(context.clientContext.identity.token, `asdf`)
	// )

	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}