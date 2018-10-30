import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import Layout from '../components/layouts/default'

export default class ProductCategoryTemplate extends React.Component{
	render(){
		const {
			data: {
				productMarkdown,
				categoryMarkdown: {
					frontmatter: {
						title,
					},
					html,
					excerpt,
				},
				allSalsifyContent,
			},
		} = this.props

		// Collect markdown data
		const products = productMarkdown.edges.map(({
			node: {
				frontmatter: {
					id,
					title,
				},
				fields: {
					path,
				},
			},
		}) => ({
			id,
			title,
			path,
		}))

		// Collect Salsify data by ID
		const salsify = {}
		allSalsifyContent.edges.forEach(({ node }) => {
			salsify[node.itemNumber] = node
		})

		return(
			<Layout title={title} description={excerpt}>
				<h1>{title}</h1>
				<div dangerouslySetInnerHTML={{__html: html}} />
				{products.map(({ id, title, path }, index) => (
					<div key={`product${index}`}>
						<Link to={path}>
							<h2>{salsify[id].itemName || title}</h2>
						</Link>
					</div>
				))}
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductCategoryTemplate($category: String!, $productIds: String) {
		productMarkdown: allMarkdownRemark(
			filter: {
				frontmatter: {
					category: { eq: $category }
					published: { eq: true }
				}
			}
			sort: { order: DESC, fields: [frontmatter___order] }
		){
			edges{
				node{
					frontmatter{
						id
						title
						date,
					}
					fields{
						path
					}
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
