import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/layouts/default'
import sanityToExcerpt from '../utils/sanity-to-excerpt'
import serializers from '../utils/sanity-serializers'

export default function GenericTemplate({
	data: {
		sanityPage: {
			title,
			_rawBody,
		} = {},
	} = {},
}){
	return(
		<Layout title={title} description={sanityToExcerpt(_rawBody, 15)}>
			<BlockContent blocks={_rawBody} serializers={serializers} />
		</Layout>
	)
}

export const query = graphql`
	query GenericTemplate($id: String!) {
		sanityPage(
			id: { eq: $id }
		){
			_rawBody
			title
		}
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
