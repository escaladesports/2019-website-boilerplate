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

		return(
			<Layout title={title} description={excerpt}>
				<h1>{title}</h1>
				<div dangerouslySetInnerHTML={{__html: html}} />
				{products.map(({ title, path }, index) => (
					<div key={`product${index}`}>
						<Link to={path}>
							<h2>{title}</h2>
						</Link>
					</div>
				))}
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductCategoryTemplate($category: String!) {
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
