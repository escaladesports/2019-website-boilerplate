import React from 'react'
import Recaptcha from 'react-google-recaptcha'
import onSubmit from './on-submit'
import onSuccess from './on-success'
import onRecaptchaChange from './on-recaptcha-change'
import awaitRecaptchaValue from './await-recaptcha-value'
import processForm from './process-form'

class NetlifyForm extends React.Component {
	static defaultProps = {
		loading: <div>Loading...</div>,
		error: msg => <div>{msg}</div>,
		recatpcha: true,
		onSubmit: noop,
		onSuccess: noop,
		onError: noop,
		validate: noop,
	}
	constructor(props){
		super(props)
		this.state = {
			error: false,
			loading: false,
			success: false,
			recaptchaError: false,
		}
		this.onSubmit = onSubmit.bind(this)
		this.onSuccess = onSuccess.bind(this)
		this.onRecaptchaChange = onRecaptchaChange.bind(this)
		this.awaitRecaptchaValue = awaitRecaptchaValue.bind(this)
		this.process = processForm.bind(this)
	}
	render(){
		const {
			loading,
			error,
			recaptchaError,
			success,
		} = this.state
		return (
			<form
				ref={el => this.form = el}
				onSubmit={this.onSubmit}
			>
				{loading && (
					this.props.loading
				)}
				{!!error && (
					this.props.error(`Internal server error. Your information was not sent. Please try again.`)
				)}
				{!!recaptchaError && (
					this.props.error(`reCAPTCHA not complete. Please try again.`)
				)}
				{success && (
					this.props.success
				)}
				{!loading && !success && (
					this.props.form
				)}
				{this.props.recaptcha && (
					<Recaptcha
						sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY}
						size='invisible'
						ref={el => this.recaptchaEl = el}
						onChange={this.onRecaptchaChange}
					/>
				)}
			</form>
		)
	}
}

function noop(){}

export default NetlifyForm