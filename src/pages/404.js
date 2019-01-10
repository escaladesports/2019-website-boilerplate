import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'

export default class NotFoundPage extends React.Component {
	render() {
		const {
			page: {
				frontmatter: {
					title,
				},
				html,
				excerpt,
			},
		} = this.props.data


		return (
			<Layout title={title} description={excerpt}>
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</Layout>
		)
	}
}

export const query = graphql`
	query NotFoundPage {
		page: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/404.md/"
		}){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}
	}
`