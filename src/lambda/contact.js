import dotEnv from 'dotenv'
import Recaptcha from 'recaptcha-verify'
import sendEmail from '../functions/send-email'
dotEnv.config({ silent: true })
const { SITE_RECAPTCHA_SECRET } = process.env
const recaptcha = new Recaptcha({
	secret: SITE_RECAPTCHA_SECRET,
	verbose: true,
})

const allowed = [
	`name`,
	`email`,
	`message`,
]
const required = [
	`name`,
	`email`,
	`message`,
]
const sendTo = `krose@escaladesports.com`
const subject = `Contact Form Submission`

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
		for(let i in input){
			if (allowed.indexOf(i) > -1) {
				data[i] = input[i]
			}
		}

		// Validate recaptcha
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

		// Build and send email
		await sendEmail({
			template: `contact`,
			from: data.email,
			to: sendTo,
			subject,
			data,
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

