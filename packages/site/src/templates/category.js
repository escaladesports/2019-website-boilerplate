import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../components/layouts/default'

export default function ProductCategoryTemplate({
	data: {
		allSanityProduct,
		categoryMarkdown: {
			frontmatter: {
				title,
			},
			html,
			excerpt,
		},
	},
}){
	// Collect markdown data
	const products = allSanityProduct.edges.map(({ node }) => node)

	return(
		<Layout title={title} description={excerpt}>
			<h1>{title}</h1>
			<div dangerouslySetInnerHTML={{__html: html}} />
			{products.map(({ title, slug }, index) => (
				<div key={`product${index}`}>
					<Link to={`/${slug.current}`}>
						<h2>{title}</h2>
					</Link>
				</div>
			))}
		</Layout>
	)
}

export const query = graphql`
	query ProductCategoryTemplate($category: String!) {
		allSanityProduct(
			filter: {
				categories: {
					elemMatch: {
						slug: {
							current: { eq: $category }
						}
					}
				}
			}
		){
			edges{
				node{
					title
					slug{
						current
					}
				}
			}
		}

		categoryMarkdown: markdownRemark(
			frontmatter: {
				id: { eq: $category }
			}
		){
			frontmatter{
				title
			}
			html
			excerpt(pruneLength: 175)
		}
	}
`
