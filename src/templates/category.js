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
				category: {
					frontmatter: {
						title,
					},
					html,
					excerpt,
				},
				site: {
					siteMetadata: {
						siteTitle,
					},
				},
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
				<Helmet title={title} siteTitle={siteTitle} description={excerpt}>
					<title>{`${title} | ${siteTitle}`}</title>
					<meta name='description' content={excerpt} />
				</Helmet>
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

		category: markdownRemark(
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

		site{
			siteMetadata{
				siteTitle: title
			}
		}
	}
`
