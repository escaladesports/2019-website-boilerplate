import React from 'react'
import Layout from '../../components/layouts/email'

export default class EmailIdentityConfirmation extends React.Component {
	render() {
		return (
			<Layout>
				<h2>Confirm your signup</h2>
				<p>Follow this link to confirm your account:</p>
				<p>
					<a href='{{ .SiteURL }}/admin/#confirmation_token={{ .Token }}'>Confirm your mail</a>
				</p>
			</Layout>
		)
	}
}