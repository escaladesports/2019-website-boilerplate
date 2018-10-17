import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'
import formatUSD from '../functions/format-usd'
import Carousel from '../components/photo-carousel'

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
			props: {
				data: {
					product: {
						frontmatter: {
							title,
							price,
							images,
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
			},
			state: {
				color,
				id,
			},
		} = this

		const hasImages = images && !!images.length
		// const hasThumbnails = images && (images.length > 1)

		return(
			<Layout title={title} siteTitle={siteTitle} description={excerpt}>
				<h1>{title}</h1>
				{hasImages && (
					<Carousel images={images} />
				)}
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
				images
				variants{
					color
					id
				}
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