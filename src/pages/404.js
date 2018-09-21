import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from 'components/layouts/default'

export default class NotFoundPage extends React.Component {
	render() {
		const {
			frontmatter,
			html,
			excerpt,
		} = this.props.data.page
		const { siteTitle } = this.props.data.site.frontmatter
		return (
			<Layout>
				<Helmet>
					<title>{`${frontmatter.title} | ${siteTitle}`}</title>
					<meta name='description' content={excerpt} />
				</Helmet>
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

		site: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/settings/site.md/"
		}){
			frontmatter{
				siteTitle
			}
		}
	}
`