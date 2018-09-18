export default function onRecaptchaChange(recaptchaValue) {
	console.log(`Invisible reCAPTCHA value set`)
	this.setState({ recaptchaValue })
	this.process()
}