import React from 'react'
import { graphql } from 'gatsby'
import { Image } from 'cloudinary-react'
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
					site: {
						siteMetadata: {
							siteTitle,
						},
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

		return(
			<Layout title={itemName || title} siteTitle={siteTitle} description={excerpt}>
				<h1>{itemName || title}</h1>
				{hasImages && (
					<Carousel ratio={imageRatio} slides={webImages.map(({ url }, index) => (
						<Image
							key={`img${index}`}
							publicId={url.split(`/`).pop()}
							// cname='images.salsify.com'
							secureDistribution='images.salsify.com'
							width='auto'
							aspectRatio={`${imageRatio[0]}:${imageRatio[1]}`}
							crop='pad'
							responsive={true}

							cloudName='salsify'
							privateCdn={true}
							secure={true}
							// cdnSubdomain={true}
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
					<li>Price: {formatUSD(price, true)}</li>
					<li>{stock ? `In stock` : `Out of stock`}</li>
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
				images
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

		site{
			siteMetadata{
				siteTitle: title
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