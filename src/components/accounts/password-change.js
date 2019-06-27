import React from 'react'
import { css } from '@emotion/core'
import { changePassword } from '../../utils/auth'

export default class PasswordChange extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			passwordChangeLoading: false,
			passwordChange: false,
		}
	}
	async resetPasswordButton(){
		this.setState({ passwordChangeLoading: true })
		await changePassword()
		this.setState({
			passwordChange: true,
			passwordChangeLoading: false,
		})
	}
	render() {
		const { passwordChange, passwordChangeLoading } = this.state
		return (
			<div css={styles.container}>
				{passwordChangeLoading && (
					<div>Sending email...</div>
				)}
				{!passwordChangeLoading && !passwordChange && (
					<a href='#' onClick={e => {
						e.preventDefault()
						this.resetPasswordButton()
					}}>
						Change password
					</a>
				)}
				{!passwordChangeLoading && passwordChange && <>
					<div>We've just sent you an email to reset your password.</div>
					<div>
						<a href='#' onClick={e => {
							e.preventDefault()
							this.resetPasswordButton()
						}}>
							Resend email
						</a>
					</div>
				</>}
			</div>
		)
	}
}

const styles = {
	container: css`
		font-size: .8em;
	`,
}