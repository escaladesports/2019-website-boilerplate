import React from 'react'
import Default from 'templates/default'

export default class MainTemplate extends React.Component {
	render() {
		const post = this.props.data.markdownRemark
		return (
			<Default>
				<h1>{post.frontmatter.title}</h1>
				<p>{post.frontmatter.date}</p>
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
			</Default>
		)
	}
}



export const pageQuery = graphql`
	query ProductBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
			}
		}
	}
`
