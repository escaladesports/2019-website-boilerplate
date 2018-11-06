import React from 'react'
import { css } from 'emotion'
import linkMixin from '../styles/mixins/link'
import EmailTemplate from '../components/layouts/email'

export default class BackendEmail extends React.Component {
	render() {
		let { title, children } = this.props
		return (
			<EmailTemplate title={title}>
				<div className={styles.wrapper}>
					<p className={styles.img}>
						<img src='/backend-logo.png' />
					</p>
					{children}
				</div>
			</EmailTemplate>
		)
	}
}

const styles = {
	wrapper: css`
		max-width: 600px;
		padding: 20px;
		margin: 0 auto;
		a{
			${linkMixin};
		}
	`,
	img: css`
		text-align: center;
		img{
			width: 300px;
		}
	`,
}