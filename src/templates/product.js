import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layouts/default'
import formatUSD from '../functions/format-usd'

export default class ProductTemplate extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		const {
			product: {
				frontmatter: {
					title,
					color,
					id,
					price,
				},
				html,
			},
			site: {
				frontmatter: {
					siteTitle,
				},
			},
		} = this.props.data

		return(
			<Layout>
				<Helmet>
					<title>{`${title} | ${siteTitle}`}</title>
				</Helmet>
				<h1>{title}</h1>
				<ul>
					<li>Color: {color}</li>
					<li>ID: {id}</li>
					<li>Price: {formatUSD(price)}</li>
				</ul>
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
				color
				id
				variants{
					color
					id
				}
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