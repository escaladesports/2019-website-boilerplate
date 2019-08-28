import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { addToCart } from '@escaladesports/zygote-cart'
import Img from 'gatsby-image'
import Layout from 'components/layouts/default'
import { usePrices } from 'react-escalade-pricing'
import Stock from '../components/stock'
import Carousel from 'components/photo-carousel'
import sanityToExcerpt from 'utils/sanity-to-excerpt'
import SanityBlock from 'components/sanity-block'
import productIds from 'utils/.cache/product-ids.json'

export default function ProductTemplate({
	data: {
		sanityProduct: {
			title,
			defaultProductVariant = {},
			variants = [],
			_rawBody,
		} = {},
		escaladePricing: {
			price: cachedPrice,
		} = {},
	} = {},
}) {
	const excerpt = sanityToExcerpt(_rawBody, 15)
	const { id } = defaultProductVariant
	const [livePrice] = usePrices(id, productIds)
	const [selectedProduct, setSelectedProduct] = useState(defaultProductVariant)
	const allVariants = [defaultProductVariant, ...variants]
	const price = livePrice || cachedPrice
	console.log(`price`, price)

	const { images = [] } = selectedProduct
	const imageRatio = [16, 9]
	// Change later
	const thumbnail = images.length ? images[0].asset.thumbnail.src : false
	return (
		<Layout title={title} description={excerpt}>
			<h1>{title}</h1>

			{!!images.length && (
				<Carousel
					ratio={imageRatio}
					slides={images.map(({ asset: { fluid }}, index) => (
						<Img
							key={`img${index}`}
							fluid={fluid}
							alt={`${title} ${index + 1}`}
						/>
					))}
				/>
			)}

			<ul>
				{allVariants.map((variant, index) => (
					<li key={index}>
						{variant.id === selectedProduct.id && variant.color}
						{variant.id !== selectedProduct.id && (
							<a href='#' onClick={e => {
								e.preventDefault()
								setSelectedProduct(variant)
							}}>
								{variant.color}
							</a>
						)}
					</li>
				))}
			</ul>

			{!!price && (
				<button
					onClick={() => addToCart({
						id: selectedProduct.id,
						name: title,
						image: thumbnail,
						description: `Color: ${selectedProduct.color}`,
						price: parseInt(price.toString().replace(`.`, ``)),
						shippable: true,
					})}
				>
					Add to Cart
				</button>
			)}

			<ul>
				<li>Color: {selectedProduct.color}</li>
				<li>ID: {selectedProduct.id}</li>
				{!!price && (
					<li>Price: ${price}</li>
				)}
				<li>
					<Stock id={selectedProduct.id}>
						{stock => <>
							{!!stock && `In stock`}
							{!stock && `Out of stock`}
						</>}
					</Stock>
				</li>
			</ul>
			<SanityBlock body={_rawBody} />
		</Layout>
	)
}

export const query = graphql`
	query ProductTemplate($id: String!, $sku: String!) {
		sanityProduct(
			id: { eq: $id }
		){
			title
			_rawBody
			categories{
				slug{
					current
				}
			}
			defaultProductVariant{
				id: sku
				color
				images{
					asset {
						fluid(maxWidth: 700) {
							...GatsbySanityImageFluid
						}
						thumbnail: fluid(maxWidth: 150){
							src
						}
					}
				}
			}
			variants{
				id: sku
				color
				images{
					asset {
						fluid(maxWidth: 700) {
							...GatsbySanityImageFluid
						}
					}
				}
			}
		}

		escaladePricing(
			productId: { eq: $sku }
		){
				productId
				price
		}
	}
`