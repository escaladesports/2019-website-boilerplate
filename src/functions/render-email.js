import { renderEmail } from 'react-html-email'
import IdentityEmail from '../pages/email-templates/invitation'

export function handler(_, __, callback){
	const html = renderEmail(IdentityEmail)
	console.log(html)
	callback(null, {
		statusCode: 200,
		body: html,
	})
}