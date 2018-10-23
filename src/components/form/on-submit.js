async function onSubmit(e) {
	console.log(`Form submit...`)
	e.preventDefault()

	// Check invisible recaptcha
	if (this.props.recaptcha) {
		console.log(`Executing invisible reCAPTCHA...`)
		try {
			let res = await this.recaptchaEl.execute()
			console.log(`reCAPTCHA response: ${res}`)
			return
		}
		catch (err) {
			console.log(`reCAPTCHA execution error`)
			console.error(err)
			return this.setState({
				loading: false,
				error: false,
				success: false,
				recaptchaError: true,
			})
		}
	}
	else{
		this.process()
	}

}

export default onSubmit