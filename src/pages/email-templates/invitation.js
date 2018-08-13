import React from 'react'
import { css } from 'emotion'

export default class EmailInvitation extends React.Component {
	render() {
		return (
			<div className={wrapperStyles}>
				<h2>You have been invited</h2>
				<p>You have been invited to create a user on {`{{ .SiteURL}}`}. Follow this link to accept the invite:</p>
				<p>
					<a href='{{ .SiteURL }}/admin/#invite_token={{ .Token }}'>Accept the invite</a>
				</p>
			</div>
		)
	}
}

const wrapperStyles = css({
	maxWidth: 580,
	margin: `0 auto`,
	fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
	textRendering: `optimizeLegibility`,
	'-webkit-font-smoothing': `antialiased`,
})