import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import hasha from 'hasha'
// import crypto from 'crypto'

const {
	JWT_SIGNING_SECRET,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_USERNAME,
	CLOUDINARY_API_SECRET,
} = process.env

export function handler(body, context, callback){

	const { nf_jwt } = parse(body.headers.cookie)

	console.log(`JWT`, nf_jwt)

	try{
		const {
			app_metadata: {
				roles,
			},
		} = jwt.verify(nf_jwt, JWT_SIGNING_SECRET)
		if(roles.indexOf(`admin`) === -1){
			throw `Admin role not found`
		}


		// Create signature
		const timestamp = Date.now().toString()
		const str = `cloud_name=${CLOUDINARY_CLOUD_NAME}&timestamp=${timestamp}&username=${CLOUDINARY_USERNAME}${CLOUDINARY_API_SECRET}`
		console.log(`STR`, str)
		const signature = hasha(str, { algorithm: `sha256` })
		console.log(`SIGNATURE`, signature)

		callback(null, {
			statusCode: 200,
			body: JSON.stringify({
				username: CLOUDINARY_USERNAME,
				timestamp,
				signature,
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

// function hashSignature(obj, secret) {
// 	const arr = []
// 	Object.keys(obj).sort().forEach(key => {
// 		arr.push(`${key}=${obj[key]}`)
// 	})

// 	return crypto.createHash(`sha256`)
// 		.update(arr.join(`&`) + secret)
// 		.digest(`hex`)
// }