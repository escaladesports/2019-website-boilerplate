import React from 'react'
import { graphql } from 'gatsby'
import Img from '../components/cloudinary-image'
import Layout from '../components/layouts/default'
import Price from '../components/price'
import Stock from '../components/stock'
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
		} = props.data.markdownRemark
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
					markdownRemark: {
						frontmatter: {
							title,
						},
						html,
						excerpt,
					},
					salsifyContent: {
						itemName,
						webImages,
					},
					escaladePricing: {
						price,
					},
					escaladeInventory: {
						stock,
					},
				},
			},
			state: {
				color,
				id,
			},
		} = this

		const hasImages = webImages && !!webImages.length
		const imageRatio = [16, 9]
		const productTitle = itemName || title

		return(
			<Layout title={productTitle} description={excerpt}>
				<h1>{productTitle}</h1>
				{hasImages && (
					<Carousel ratio={imageRatio} slides={webImages.map(({ url }, index) => (
						<Img
							key={`img${index}`}
							src={url}
							ratio={imageRatio}
							alt={`${productTitle} ${index + 1}`}
						/>
					))} />
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
					<li>Price: $<Price id={id} price={price} /></li>
					<li>
						<Stock stock={stock} id={id}>
							{stock => <>
								{!!stock && `In stock`}
								{!stock && `Out of stock`}
							</>}
						</Stock>
					</li>
				</ul>
				<div dangerouslySetInnerHTML={{__html: html}} />
			</Layout>
		)
	}
}

export const query = graphql`
	query ProductTemplate($id: String!) {
		markdownRemark(
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
			excerpt(pruneLength: 175)
		}

		salsifyContent(
			itemNumber: { eq: $id }
		){
			itemName
			webImages{
				id
				name
				url
				filename
			}
		}

		escaladePricing(
			productId: { eq: $id }
		){
			price
		}
		escaladeInventory(
			productId: { eq: $id }
		){
			stock
		}
	}
`