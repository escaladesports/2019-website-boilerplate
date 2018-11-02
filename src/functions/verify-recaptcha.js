import Recaptcha from 'recaptcha-verify'
import dotEnv from 'dotenv'
dotEnv.config({ silent: true })
const { SITE_RECAPTCHA_SECRET } = process.env
const recaptcha = new Recaptcha({
	secret: SITE_RECAPTCHA_SECRET,
	verbose: true,
})

export default function verifyRecaptcha(token) {
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