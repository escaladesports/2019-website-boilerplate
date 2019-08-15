import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'

export default function GenericTemplate({
	data: {
		page: {
			frontmatter: {
				title,
			},
			html,
			excerpt,
		},
	},
}){
	return(
		<Layout title={title} description={excerpt}>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</Layout>
	)
}

export const query = graphql`
	query GenericTemplate($id: String!) {
		page: markdownRemark(
			id: { eq: $id }
		){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}
	}
`
