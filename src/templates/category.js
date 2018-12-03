import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../components/layouts/default'

export default class ProductCategoryTemplate extends React.Component{
	render(){
		const {
			data: {
				contentfulCategory: {
					name,
					body: {
						childMarkdownRemark: {
							html,
							excerpt,
						},
					},
					product,
				},
				allSalsifyContent,
			},
		} = this.props

		// Collect Salsify data by ID
		const salsify = {}
		allSalsifyContent.edges.forEach(({ node }) => {
			salsify[node.itemNumber] = node
		})

		return(
			<Layout title={name} description={excerpt}>
				<h1>{name}</h1>
				<div dangerouslySetInnerHTML={{__html: html}} />
				{product.map(({ productId, name, slug }, index) => (
					<div key={index}>
						<Link to={`/${slug}`}>
							<h2>{salsify[productId].itemName || name}</h2>
						</Link>
					</div>
				))}
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductCategoryTemplate($slug: String!, $productIds: String) {

		contentfulCategory(
			slug: { eq: $slug }
		){
			name
			body{
				childMarkdownRemark{
					html
					excerpt(pruneLength: 175)
				}
			}
			product{
				productId,
				name,
				slug,
			}
		}

		allSalsifyContent(
			filter: {
				itemNumber: { regex: $productIds }
			}
		){
			edges{
				node{
					itemName
					itemNumber
				}
			}
		}
	}
`
