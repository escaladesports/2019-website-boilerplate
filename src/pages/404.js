import React from 'react'
import Layout from '../components/layouts/default'
import Meta from '../components/meta'

export default class PageNotFound extends React.Component {
	render() {
		const {
			frontmatter,
			html,
		} = this.props.data.markdownRemark
		return (
			<Layout>
				<Meta title={frontmatter.title} />
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</Layout>
		)
	}
}

export const query = graphql`
	query PageNotFound {
		markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/404.md/"
		}){
			html
			frontmatter{
				title
			}
		}
	}
`