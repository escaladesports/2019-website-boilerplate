import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layouts/default'
import formatUSD from '../functions/format-usd'

export default class ProductTemplate extends React.Component{
	constructor(props){
		super(props)

		// Props that can change when a variant is selected
		const variantProps = [
			`color`,
			`id`,
		]

		// Set parent product props to state
		const {
			frontmatter,
			frontmatter: {
				variants,
			},
		} = props.data.product
		const state = {}
		variantProps.forEach(prop => {
			state[prop] = frontmatter[prop]
		})
		this.state = state

		// Store all variants including parent
		this.allVariants = [{ ...state }, ...variants]
	}
	render(){
		const {
			product: {
				frontmatter: {
					title,
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
		const {
			color,
			id,
		} = this.state

		return(
			<Layout>
				<Helmet>
					<title>{`${title} | ${siteTitle}`}</title>
				</Helmet>
				<h1>{title}</h1>
				<ul>
					{this.allVariants.map((variant, index) => (
						<li key={index}>
							{variant.id === id && variant.color}
							{variant.id !== id && (
								<a href='#' onClick={e => {
									e.preventDefault()
									this.setState(variant)
								}}>
									{variant.color}
								</a>
							)}
						</li>
					))}
				</ul>
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