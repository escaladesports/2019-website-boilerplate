import React from 'react'
import Recaptcha from 'react-google-recaptcha'
import onSubmit from './on-submit'
import onSuccess from './on-success'
import onRecaptchaChange from './on-recaptcha-change'
import defaultProps from './default-props'
import awaitRecaptchaValue from './await-recaptcha-value'
import process from './process'

class NetlifyForm extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			error: false,
			loading: false,
			success: false,
		}
		this.onSubmit = onSubmit.bind(this)
		this.onSuccess = onSuccess.bind(this)
		this.onRecaptchaChange = onRecaptchaChange.bind(this)
		this.awaitRecaptchaValue = awaitRecaptchaValue.bind(this)
		this.process = process.bind(this)
	}
	render(){
		return (
			<form
				ref={el => this.form = el}
				onSubmit={this.onSubmit}
			>
				{this.props.children({
					...this.state,
					recaptcha:
						<Recaptcha
							{...this.props.recaptcha}
							ref={el => this.recaptchaEl = el}
							onChange={this.onRecaptchaChange}
						/>,
				})}
			</form>
		)
	}
}

NetlifyForm.defaultProps = defaultProps

export default NetlifyForm