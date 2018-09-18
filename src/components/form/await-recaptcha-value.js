export default function awaitRecaptchaValue(){
	return new Promise((resolve) => {
		const interval = setInterval(() => {
			if (this.state.recaptchaValue){
				clearInterval(interval)
				resolve()
			}
		}, 1)
	})
}