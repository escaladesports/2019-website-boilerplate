import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from 'components/layouts/default'
import sanityToExcerpt from 'utils/sanity-to-excerpt'
import SanityBlock from 'components/sanity-block'

export default function GenericTemplate({
	data: {
		sanityPage: {
			title,
			_rawBody,
		} = {},
		allCloudinary = {},
	} = {},
}){
	console.log(allCloudinary)
	return(
		<Layout title={title} description={sanityToExcerpt(_rawBody, 15)}>
			<Img fixed={allCloudinary.edges[0].node.fixed} />
			<Img fluid={allCloudinary.edges[0].node.fluid} />
			<SanityBlock body={_rawBody} />
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
		allCloudinary {
			edges {
				node {
					fixed(height: 300, width: 300) {
						...GatsbyCloudinaryFixed
					}
					fluid(maxWidth: 1600, quality: 100){
						...GatsbyCloudinaryFluid
					}
				}
			}
		}
	}
`
