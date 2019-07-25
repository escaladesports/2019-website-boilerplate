import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { addToCart } from '@escaladesports/zygote-cart'
import Img from '../components/netlify-image'
import Layout from '../components/layouts/default'
import usePrices from '../components/use-prices'
import Stock from '../components/stock'
import Carousel from '../components/photo-carousel'

export default function ProductTemplate({
	data: {
		markdownRemark: {
			frontmatter: {
				id,
				color,
				title,
				images,
				variants,
			},
			html,
			excerpt,
		},
	},
}){
	const defaultProduct = { id, color }
	const [selectedProduct, setSelectedProduct] = useState(defaultProduct)
	const allVariants = [defaultProduct, ...variants]
	const [prices] = usePrices()
	const { price } = prices[id]
	console.log(`price`, price)

	const hasImages = images && !!images.length
	const imageRatio = [16, 9]
	const thumbnail = hasImages ?
		`${images[0]}?nf_resize=fit&w=150&h=150` :
		null
	return (
		<Layout title={title} description={excerpt}>
			<h1>{title}</h1>

			{hasImages && (
				<Carousel ratio={imageRatio} slides={images.map((url, index) => (
					<Img
						ratio={imageRatio}
						key={`img${index}`}
						src={url}
						alt={`${title} ${index + 1}`}
					/>
				))} />
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
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</Layout>
	)
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
	}
`