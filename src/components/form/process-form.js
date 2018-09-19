/*global FormData:true*/
/*eslint no-undef: "error"*/
import fetch from 'isomorphic-fetch'

export default async function processForm(){
	const {
		onSubmit,
		action,
		onError,
		validate,
	} = this.props

	let body = new FormData(this.form)

	if (!this.state.recaptchaValue) {
		const msg = `reCAPTCHA value not set`
		console.error(msg)
		onError(msg)
		return this.setState({
			loading: false,
			error: false,
			success: false,
			recaptchaError: true,
		})
	}
	body.append(`g-recaptcha-response`, this.state.recaptchaValue)

	this.setState({
		loading: true,
		error: false,
		success: false,
		recaptchaError: false,
	})

	let notValid = await validate(body)
	if (notValid) {
		return this.setState({
			loading: false,
			error: false,
			success: false,
			recaptchaError: false,
		})
	}

	onSubmit(body)

	if (action) {
		let { status } = await fetch(action, {
			method: `POST`,
			body,
		})
		if (status !== 200) {
			const msg = `Status code: ${status}`
			console.error(msg)
			onError(msg)
			return this.setState({
				loading: false,
				error: true,
				success: false,
				recaptchaError: false,
			})
		}
	}
	this.onSuccess(body)
}