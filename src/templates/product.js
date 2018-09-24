import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layouts/default'

export default class ProductTemplate extends React.Component{
	render(){
		const { title } = this.props.data.product.frontmatter
		const { html } = this.props.data.product
		const { siteTitle } = this.props.data.site.frontmatter
		return(
			<Layout>
				<Helmet>
					<title>{`${title} | ${siteTitle}`}</title>
				</Helmet>
				<h1>{title}</h1>
				<div dangerouslySetInnerHTML={{__html: html}} />
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductTemplate($id: String!) {
		product: markdownRemark(
			frontmatter: {
				id: { eq: $id }
			}
		){
			frontmatter{
				title
			}
		}

		site: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/settings/site.md/"
		}){
			frontmatter{
				siteTitle
			}
			html
		}
	}
`
