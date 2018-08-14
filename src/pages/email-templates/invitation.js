import React from 'react'
import { css } from 'emotion'
import { Helmet } from 'react-helmet'
import linkMixin from '../../styles/mixins/link'
import '../../styles/global.css'

export default class EmailInvitation extends React.Component {
	render() {
		return (
			<div className={wrapper}>
				<Helmet>
					<html lang='en' dir='ltr' />
					<body bgColor='#fff' width='100%' />
				</Helmet>
				<h2>You have been invited</h2>
				<p>You have been invited to create a user on {`{{ .SiteURL}}`}. Follow this link to accept the invite:</p>
				<p>
					<a className={linkMixin} href='{{ .SiteURL }}/admin/#invite_token={{ .Token }}'>Accept the invite</a>
				</p>
			</div>
		)
	}
}

const wrapper = css({
	maxWidth: 600,
	padding: 20,
	margin: `0 auto`,
})