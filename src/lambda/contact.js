import dotEnv from 'dotenv'
import Recaptcha from 'recaptcha-verify'
import Mailgun from 'mailgun-js'
dotEnv.config({ silent: true })
const recaptcha = new Recaptcha({
	secret: process.env.SITE_RECAPTCHA_SECRET,
	verbose: true,
})
const mailgun = Mailgun({
	apiKey: process.env.MAILGUN_API_KEY,
	domain: process.env.MAILGUN_DOMAIN,
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

		// Send email
		console.log(data)
		let text = []
		for(let key in data){
			text.push(`${key}: ${data[key]}`)
		}
		text = text.join(`\n`)
		await sendMail({
			from: `no-reply@${process.env.MAILGUN_DOMAIN}`,
			to: `krose@escaladesports.com`,
			subject: `Contact Form Submission`,
			text,
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

async function sendMail(data){
	return new Promise((resolve, reject) => {
		mailgun.messages().send(data, (error, body) => {
			if(error) reject(error)
			else resolve(body)
		})
	})
}