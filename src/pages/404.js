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
			site: {
				siteMetadata: {
					siteTitle,
				},
			},
		} = this.props.data


		return (
			<Layout title={title} siteTitle={siteTitle} description={excerpt}>
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

		site{
			siteMetadata{
				siteTitle: title
			}
		}
	}
`