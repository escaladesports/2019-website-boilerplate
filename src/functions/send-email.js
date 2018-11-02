import Mailgun from 'mailgun-js'
const {
	MAILGUN_API_KEY,
	MAILGUN_DOMAIN,
} = process.env
const mailgun = Mailgun({
	apiKey: MAILGUN_API_KEY,
	domain: MAILGUN_DOMAIN,
})

export default async function sendEmail(data) {
	return new Promise((resolve, reject) => {
		mailgun.messages().send(data, (error, body) => {
			if (error) reject(error)
			else resolve(body)
		})
	})
}