import React from 'react'
import { renderToString } from 'react-dom/server'
import EmailTemplate from '../pages/email-templates/contact'
import verifyRecaptcha from '../functions/verify-recaptcha'
import sendEmail from '../functions/send-email'

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
const to = `krose@escaladesports.com`
const subject = `Contact Form Submission`

export async function handler({ body }){

	/*
	// Change to:
	return await sendLambdaEmail({
		allowed: [`name`, `email`, `message`],
		required: [`name`, `email`, `message`],
		to: `krose@escaladesports.com`,
		subject: `Contact Form Submission`,
		body,
	})
	*/

	try{
		const input = JSON.parse(body)

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
		const data = {}
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
		const html = renderToString(<EmailTemplate {...data} />)
		await sendEmail({
			html,
			from: data.email,
			to,
			subject,
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
