import React from 'react'
import { css } from 'emotion'

export default class EmailInvitation extends React.Component {
	render() {
		return (
			<table className={tableStyles}>
				<tr>
					<td>
						<h2>You have been invited</h2>
						<p>You have been invited to create a user on {`{{ .SiteURL}}`}. Follow this link to accept the invite:</p>
						<p>
							<a href='{{ .SiteURL }}/admin/#invite_token={{ .Token }}'>Accept the invite</a>
						</p>
					</td>
				</tr>
			</table>
		)
	}
}

const tableStyles = css({
	color: `#00f`,
})