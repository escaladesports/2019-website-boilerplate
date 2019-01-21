import jwt from 'jsonwebtoken'

const { JWT_SIGNING_SECRET } = process.env

export function handler(body, context, callback){

	// console.log(`BODY`, body)
	// console.log(`CONTEXT`, context)

	console.log(
		`bodyRes with secret`,
		jwt.verify(body.headers.cookie.split(`nf_jwt=`)[1], JWT_SIGNING_SECRET)
	)

	console.log(
		`contextRes with secret`,
		jwt.verify(context.clientContext.identity.token, JWT_SIGNING_SECRET)
	)


	console.log(
		`bodyRes with bunk`,
		jwt.verify(body.headers.cookie.split(`nf_jwt=`)[1], `asdf`)
	)
	console.log(
		`contextRes with bunk`,
		jwt.verify(context.clientContext.identity.token, `asdf`)
	)

	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}