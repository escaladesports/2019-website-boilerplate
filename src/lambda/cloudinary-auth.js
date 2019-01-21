import jwt from 'jsonwebtoken'
import { parse } from 'cookie'

const { JWT_SIGNING_SECRET } = process.env

export function handler(body, context, callback){

	const { nf_jwt } = parse(body.headers.cookie)

	try{
		const {
			app_metadata: {
				roles,
			},
		} = jwt.verify(nf_jwt, JWT_SIGNING_SECRET)
		if(roles.indexOf(`admin`) === -1){
			throw `Admin role not found`
		}
		callback(null, {
			statusCode: 200,
			body: JSON.stringify({
				success: true,
			}),
		})
	}
	catch(err){
		console.error(err)
		callback(null, {
			statusCode: 403,
			body: JSON.stringify({
				success: false,
			}),
		})
	}


}