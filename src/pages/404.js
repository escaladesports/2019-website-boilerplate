import React, { Fragment } from 'react'
import Meta from '../components/meta'

export default class PageNotFound extends React.Component {
	render() {
		const {
			frontmatter,
			html,
		} = this.props.data.markdownRemark
		return (
			<Fragment>
				<Meta title={frontmatter.title} />
				<section>
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</section>
			</Fragment>
		)
	}
}

export const query = graphql`
	query PageNotFound {
		markdownRemark(fields: {
			slug: { eq: "/404" }
		}){
			html
			frontmatter{
				title
			}
		}
	}
`
