import React from 'react'
import { join } from 'path'
import { renderToString } from 'react-dom/server'
import posthtml from 'posthtml'
import { siteUrl } from '../../site-config'
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

	try{
		const input = JSON.parse(body)

		// Validate user input
		for(let i = 0; i < required.length; i++){
			const name = required[i]
			if (!(name in input)) {
				return {
					statusCode: 400,
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
				statusCode: 400,
				body: JSON.stringify({
					success: false,
					message: `reCAPTCHA error. Form could not be submit.`,
				}),
			}
		}

		// Build and send email
		const res = await posthtml()
			.use(absoluteImages())
			.process(renderToString(<EmailTemplate {...data} />))

		const { html } = res

		await sendEmail({
			from: data.email,
			to,
			subject,
			html,
		})

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true }),
		}
	}
	catch(err){
		console.error(err)
		return {
			statusCode: 400,
			body: JSON.stringify({
				success: false,
				message: `Server error. Form could not be submit.`,
			}),
		}
	}
}

function absoluteImages() {
	return function (tree) {
		tree.walk(node => {
			if (typeof node === `object`) {
				if (!node.attrs) {
					node.attrs = {}
				}
				let { src } = node.attrs
				if (node.tag === `img`) {
					if (siteUrl && src.indexOf(`://`) === -1) {
						let srcUrl = siteUrl.split(`://`)
						src = join(srcUrl[1], src)
						src = `${srcUrl[0]}://${src}`
						node.attrs.src = src
					}
				}
			}
			return node
		})
		return tree
	}
}