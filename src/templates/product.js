import React from 'react'
import { graphql } from 'gatsby'
import { Image } from 'cloudinary-react'
import Layout from '../components/layouts/default'
import formatUSD from '../functions/format-usd'
import Carousel from '../components/photo-carousel'

export default class ProductTemplate extends React.Component{
	constructor(props){
		super(props)

		// Set parent product props to state
		const {
			productId,
			color,
			variants,
		} = props.data.contentfulProduct
		this.state = {
			productId,
			color,
		}
		this.allVariants = [
			{...this.state},
			...variants.map(({ productId, color }) => ({ productId, color })),
		]
	}
	render(){
		const {
			props: {
				data: {
					contentfulProduct: {
						name,
						body: {
							childMarkdownRemark: {
								html,
								excerpt,
							},
						},
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
				productId,
				color,
			},
		} = this

		const hasImages = webImages && !!webImages.length
		const imageRatio = [16, 9]

		return(
			<Layout title={itemName || name} description={excerpt}>
				<h1>{itemName || name}</h1>
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
							{variant.productId === productId && variant.color}
							{variant.productId !== productId && (
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
					<li>ID: {productId}</li>
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
		contentfulProduct(
			productId: { eq: $id }
		){
			name
			color
			productId
			images{
				sizes(maxWidth: 1200){
					...GatsbyContentfulSizes
				}
			}
			variants{
				productId
				color
			}
			body{
				childMarkdownRemark{
					html
					excerpt(pruneLength: 175)
				}
			}
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