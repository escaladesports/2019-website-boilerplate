import React from 'react'
import Layout from '../../components/layouts/identity-email'

export default class EmailIdentityPasswordRecovery extends React.Component {
	render() {
		return (
			<Layout>
				<h2>Reset Password</h2>
				<p>Follow this link to reset the password for your account:</p>
				<p>
					<a href='{{ .SiteURL }}/admin/#recovery_token={{ .Token }}'>Reset Password</a>
				</p>
			</Layout>
		)
	}
}