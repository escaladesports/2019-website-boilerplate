import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
// import { utils } from 'cloudinary'
import crypto from 'crypto'

// const { api_sign_request } = utils

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
		const timestamp = Math.round((new Date()).getTime() / 1000).toString()
		const obj = {
			cloud_name: CLOUDINARY_CLOUD_NAME,
			timestamp,
			username: CLOUDINARY_USERNAME,
		}
		console.log(`Signing object:`, obj)
		console.log(`Signing with:`, CLOUDINARY_API_SECRET)
		const signature = hashSignature(obj, CLOUDINARY_API_SECRET)
		console.log(`Signature`, signature)

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

function hashSignature(obj, secret) {
	const arr = []
	Object.keys(obj).sort().forEach(key => {
		arr.push(`${key}=${obj[key]}`)
	})

	return crypto.createHash(`sha256`)
		.update(arr.join(`&`) + secret)
		.digest(`hex`)
}