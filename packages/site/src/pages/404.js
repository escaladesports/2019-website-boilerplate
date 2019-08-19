import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'

export default function NotFoundPage({
	data: {
		page: {
			frontmatter: {
				title,
			} = {},
			html,
			excerpt,
		} = {},
	} = {},
}){
	return (
		<Layout title={title} description={excerpt}>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</Layout>
	)
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