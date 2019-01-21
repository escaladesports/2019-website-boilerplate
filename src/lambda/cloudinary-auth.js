import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import { createHash } from 'crypto'

const {
	JWT_SIGNING_SECRET,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_USERNAME,
	CLOUDINARY_API_SECRET,
} = process.env

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
		const timestamp = Math.round((new Date()).getTime() / 1000)
		const sigString = `cloud_name=${CLOUDINARY_CLOUD_NAME}&timestamp=${timestamp}&username=${CLOUDINARY_USERNAME}${CLOUDINARY_API_SECRET}`
		const signature = createHash(`sha256`).update(sigString).digest(`hex`)
		const testSignature = createHash(`sha256`).update(`public_id=sample_image&timestamp=1315060510abcd`).digest(`hex`)
		console.log(`signature`, signature)
		console.log(`testSignature`, testSignature)
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