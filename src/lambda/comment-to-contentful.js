import { createClient } from 'contentful-management'
import md5 from 'md5'
import Recaptcha from 'recaptcha-verify'
import {
	SITE_RECAPTCHA_SECRET,
	CONTENTFUL_WRITE_ACCESS_TOKEN,
	CONTENTFUL_SPACE_ID,
} from '../../env'
const recaptcha = new Recaptcha({
	secret: SITE_RECAPTCHA_SECRET,
	verbose: true,
})
const contentful = createClient({
	accessToken: CONTENTFUL_WRITE_ACCESS_TOKEN,
})

const allowed = [
	`name`,
	`email`,
	`comment`,
	`pageId`,
]
const required = [
	`name`,
	`email`,
	`comment`,
	`pageId`,
]

export async function handler({ body }){

	try{
		const input = JSON.parse(body)
		const data = {}

		// Validate user input
		for(let i = 0; i < required.length; i++){
			const name = required[i]
			if (!(name in input)) {
				return {
					statusCode: 200,
					body: JSON.stringify({
						success: false,
						message: `Missing required fields. Form could not be submit.`,
					}),
				}
			}
		}

		// Filter to only accepted values
		let comment = ``
		for(let i in input){
			if (allowed.indexOf(i) > -1) {
				if(i === `comment`){
					comment = input[i]
				}
				else {
					data[i] = input[i]
				}
			}
		}
		data.comment = comment

		const recaptchaResponse = await verifyRecaptcha(input.recaptcha)
		if (!recaptchaResponse.success) {
			return {
				statusCode: 200,
				body: JSON.stringify({
					success: false,
					message: `reCAPTCHA error. Form could not be submit.`,
				}),
			}
		}

		// Add generated data
		const now = new Date()
		data.date = now.toISOString()
		data.md5 = md5(data.email)
		data.page = {
			sys: {
				type: `Link`,
				linkType: `Entry`,
				id: data.pageId,
			},
		}
		delete data.pageId
		for (let i in data) {
			data[i] = {
				'en-US': data[i],
			}
		}

		// Add to Contentful
		const space = await contentful.getSpace(CONTENTFUL_SPACE_ID)
		const environment = await space.getEnvironment(`master`)
		await environment.createEntry(`comment`, {
			fields: data,
		})

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
		}
	}
	catch(err){
		console.error(err)
		return {
			statusCode: 200,
			body: JSON.stringify({
				success: false,
				message: `Server error. Form could not be submit.`,
			}),
		}
	}
}

function verifyRecaptcha(token) {
	return new Promise((resolve, reject) => {
		recaptcha.checkResponse(token, (err, res) => {
			if (err) {
				reject(err)
			}
			else {
				resolve(res)
			}
		})
	})
}