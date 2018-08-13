import React from 'react'
import { css } from 'emotion'
import { Helmet } from 'react-helmet'

export default class EmailInvitation extends React.Component {
	render() {
		return (
			<div className={wrapperStyles}>
				<Helmet>
					<html lang='en' dir='ltr' />
					<body bgColor='#fff' width='100%' style={bodyStyles} />
				</Helmet>
				<h2>You have been invited</h2>
				<p>You have been invited to create a user on {`{{ .SiteURL}}`}. Follow this link to accept the invite:</p>
				<p>
					<a href='{{ .SiteURL }}/admin/#invite_token={{ .Token }}'>Accept the invite</a>
				</p>
			</div>
		)
	}
}

const bodyStyles = {
	textRendering: `optimizeLegibility`,
	'-webkit-font-smoothing': `antialiased`,
	'-webkit-text-size-adjust': `none`,
	margin: 0,
	padding: 0,
	minWidth: `100%`,
	direction: `ltr`,
	background: `#fff`,
	fontFamily: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
}

const wrapperStyles = css({
	maxWidth: 600,
	padding: 20,
	margin: `0 auto`,
	a: {
		color: `#0f0`,
	},
})