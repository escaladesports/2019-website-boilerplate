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
							price,
							images,
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
				},
			},
			state: {
				color,
				id,
			},
		} = this

		console.log(webImages[0])

		const hasImages = images && !!images.length
		// const hasThumbnails = images && (images.length > 1)

		return(
			<Layout title={itemName || title} siteTitle={siteTitle} description={excerpt}>
				<h1>{itemName || title}</h1>
				<Image
					cloudName='salsify'
					publicId='bom1bejm1xum9dr5uaiq.jpg'
					privateCdn={true}
					cname='images.salsify.com'
					width='auto'
					crop='scale'
					responsive={true}
				/>
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
	}
`