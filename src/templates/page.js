import React from 'react'
import Head from 'components/head'

export default class MainTemplate extends React.Component {
	render() {
		const page = this.props.data.markdown
		return (
			<main>
				<Head title={this.props.title} description={this.props.description} />
				<div>Page template:</div>
				<div dangerouslySetInnerHTML={{ __html: page.html }} />

			</main>
		)
	}
}

export const pageQuery = graphql`
	query PageBySlug($slug: String!) {
		markdown: markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
			}
		}
	}
`