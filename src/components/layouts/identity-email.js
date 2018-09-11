import React from 'react'
import { css } from 'emotion'
import EmailTemplate from './email'
import linkMixin from '../../styles/mixins/link'

export default class EmailLayout extends React.Component {
	render() {
		return (
			<EmailTemplate title={this.props.title}>
				<div className={wrapper}>
					<p className={img}>
						<img src='/backend-logo.png' />
					</p>
					{this.props.children}
				</div>
			</EmailTemplate>
		)
	}
}

const wrapper = css({
	maxWidth: 600,
	padding: 20,
	margin: `0 auto`,
	a: linkMixin,
})

const img = css({
	textAlign: `center`,
	img: {
		width: 300,
	},
})