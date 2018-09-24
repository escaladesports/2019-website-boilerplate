import React from 'react'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'
import Layout from '../components/layouts/default'

export default class ProductCategoryTemplate extends React.Component{
	render(){
		const products = this.props.data.product.edges.map(edge => edge.node)
		const { siteTitle } = this.props.data.site.frontmatter
		const { category } = this.props.pageContext
		return(
			<Layout>
				<Helmet>
					<title>{`${category} | ${siteTitle}`}</title>
				</Helmet>
				<h1>{category}</h1>
				{products.map(({ frontmatter, fields }, index) => (
					<div key={`product${index}`}>
						<Link to={fields.path}>
							<h1>{frontmatter.title}</h1>
						</Link>
					</div>
				))}
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductCategoryTemplate($category: String!) {
		product: allMarkdownRemark(
			filter: {
				frontmatter: {
					category: { eq: $category }
				}
			}
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
