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
					slug,
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
				{product.map((product, index) => (
					<div key={index}>
						<Link to={product.fields.path}>
							<h2>{salsify[product.productId].itemName || product.name}</h2>
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
			slug
			body{
				childMarkdownRemark{
					html
					excerpt(pruneLength: 175)
				}
			}
			product{
				productId
				name
				fields{
					path
				}
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
