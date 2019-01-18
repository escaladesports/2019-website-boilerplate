import jwt from 'jsonwebtoken'

const { JWT_SIGNING_SECRET } = process.env

export function handler(body, context, callback){

	// console.log(`BODY`, body)
	// console.log(`CONTEXT`, context)

	const bodyRes = jwt.verify(body.headers.cookie.split(`nf_jwt=`)[1], JWT_SIGNING_SECRET)
	console.log(`bodyRes`, bodyRes)

	const contextRes = jwt.verify(context.clientContext.identity.token, JWT_SIGNING_SECRET)
	console.log(`contextRes`, contextRes)

	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}