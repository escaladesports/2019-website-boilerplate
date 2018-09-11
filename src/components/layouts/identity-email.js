import React from 'react'
import { css } from 'emotion'
import EmailTemplate from './email'
import linkMixin from '../../styles/mixins/link'

export default class EmailLayout extends React.Component {
	render() {
		return (
			<EmailTemplate title={this.props.title}>
				<div className={styles.wrapper}>
					<p className={styles.img}>
						<img src='/backend-logo.png' />
					</p>
					{this.props.children}
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
		a: {
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