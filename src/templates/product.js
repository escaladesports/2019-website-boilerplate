import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layouts/default'
import formatUSD from '../functions/format-usd'

export default class ProductTemplate extends React.Component{
	render(){
		const { title, price } = this.props.data.product.frontmatter
		const { html } = this.props.data.product
		const { siteTitle } = this.props.data.site.frontmatter
		return(
			<Layout>
				<Helmet>
					<title>{`${title} | ${siteTitle}`}</title>
				</Helmet>
				<h1>{title}</h1>
				<div>{formatUSD(price)}</div>
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
				price
			}
			html
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
