import jwt from 'jsonwebtoken'
import { parse } from 'cookie'
import { utils } from 'cloudinary'

const { api_sign_request } = utils

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
		const timestamp = Math.round((new Date()).getTime() / 1000) + ``
		const signature = api_sign_request({
			cloud_name: CLOUDINARY_CLOUD_NAME,
			timestamp,
			username: CLOUDINARY_USERNAME,
		}, CLOUDINARY_API_SECRET)

		// Should be b4ad47fb4e25c7bf5f92a20089f9db59bc302313

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