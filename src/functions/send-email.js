import Mailgun from 'mailgun-js'
import fetch from 'isomorphic-fetch'
import Handlebars from 'handlebars'
import { siteUrl } from '../../site-config'
const {
	MAILGUN_API_KEY,
	MAILGUN_DOMAIN,
} = process.env
const mailgun = Mailgun({
	apiKey: MAILGUN_API_KEY,
	domain: MAILGUN_DOMAIN,
})

export default async function sendEmail(opts) {
	const template = opts.template
	const data = opts.data
	delete opts.template
	delete opts.data

	// Fetch email template
	const res = await fetch(`${siteUrl}/email-templates/${template}`)
	const templateContent = await res.text()
	const html = Handlebars.compile(templateContent)(data)

	// Send email
	await sendMail({
		...opts,
		html,
	})
}

async function sendMail(data) {
	return new Promise((resolve, reject) => {
		mailgun.messages().send(data, (error, body) => {
			if (error) reject(error)
			else resolve(body)
		})
	})
}