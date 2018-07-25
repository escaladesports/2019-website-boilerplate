import React, { Fragment } from 'react'
import Meta from '../components/meta'

export default class DocsTemplate extends React.Component{
	render(){
		const data = this.props.data
		const content = data.markdownRemark
		const fm = content.frontmatter
		const title = fm.title ? fm.title : content.fields.title
		console.log(this.props)
		return(
			<Fragment>
				<Meta
					title={title}
					description={content.excerpt}
				/>
				<section>
					<div dangerouslySetInnerHTML={{ __html: content.html }} />
				</section>
			</Fragment>
		)
	}
}

export const query = graphql`
	query DocsTemplateQuery($slug: String!) {
		markdownRemark(fields: {
			slug: { eq: $slug }
		}){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}
	}
`
