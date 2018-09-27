import React from 'react'
import { css } from 'emotion'
import { graphql } from 'gatsby'
import EmailTemplate from '../components/layouts/email'
import linkMixin from '../styles/mixins/link'

export default class CMSEmailTemplate extends React.Component {
	render() {
		const {
			frontmatter: {
				title,
			},
			html,
		} = this.props.data.markdownRemark

		return (
			<EmailTemplate title={title}>
				<div className={styles.wrapper}>
					<p className={styles.img}>
						<img src='/backend-logo.png' />
					</p>
					<div dangerouslySetInnerHTML={{__html: html}} />
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


export const query = graphql`
	query CMSEmail(
		$fileAbsolutePath: String
	) {
		markdownRemark(fileAbsolutePath: {
			eq: $fileAbsolutePath
		}){
			html
			frontmatter{
				title
			}
		}
	}
`
