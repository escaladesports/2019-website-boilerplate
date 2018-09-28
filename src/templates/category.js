import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import Layout from '../components/layouts/default'

export default class ProductCategoryTemplate extends React.Component{
	render(){
		const {
			data: {
				products: {
					edges,
				},
				site: {
					frontmatter: {
						siteTitle,
					},
				},
			},
			pageContext: {
				category,
			},
		} = this.props

		const products = edges.map(({
			node: {
				frontmatter: {
					title,
				},
				fields: {
					path,
				},
			},
		}) => ({
			title,
			path,
		}))

		return(
			<Layout>
				<Helmet>
					<title>{`${category} | ${siteTitle}`}</title>
				</Helmet>
				<h1>{category}</h1>
				{products.map(({ title, path }, index) => (
					<div key={`product${index}`}>
						<Link to={path}>
							<h1>{title}</h1>
						</Link>
					</div>
				))}
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductCategoryTemplate($category: String!) {
		products: allMarkdownRemark(
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
					}
					fields{
						path
					}
				}
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
