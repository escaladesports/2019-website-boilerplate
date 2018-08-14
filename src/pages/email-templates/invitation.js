import React from 'react'
import Layout from '../../components/layouts/email'

export default class EmailInvitation extends React.Component {
	render() {
		return (
			<Layout>
				<h2>You have been invited</h2>
				<p>You have been invited to create a user on {`{{ .SiteURL}}`}. Follow this link to accept the invite:</p>
				<p>
					<a href='{{ .SiteURL }}/admin/#invite_token={{ .Token }}'>Accept the invite</a>
				</p>
			</Layout>
		)
	}
}