import React from 'react'
import Img from 'gatsby-image'
import { observer, inject } from 'mobx-react'

import { OpenCart, AddToCart, CartQty, CartHasQty } from 'react-snipcart'

@inject("ExampleStore")
@observer
export default class Index extends React.Component {
	render() {
		console.log(this.props.ExampleStore)
		const img = this.props.data.testFile
		return (
			<div>
				<OpenCart>
					<CartHasQty>
						<CartQty />
					</CartHasQty>
				</OpenCart>
				<AddToCart data={{
					id: 'ABC123',
					name: 'Test Product',
					url: '/',
					price: '499.99'
				}}>
					<div>Add to Cart</div>
				</AddToCart>
				<div>Image:</div>
				<div className='container'>
					<Img sizes={img.sizes} />
				</div>
				<style jsx>{`
					.container{
						width: 300px;
					}
				`}</style>
			</div>
		)
	}
}


// MSRP
export const pageQuery = graphql`
	query HomepageQueries {
		productData: allMarkdownRemark {
			edges {
				node {
					html
					frontmatter {
						title
					}
				}
			}
		}
		testFile: imageSharp(id: { regex: "/test.jpg/" }) {
			sizes(maxWidth: 300) {
				...GatsbyImageSharpSizes_noBase64
			}
		}
	}
`
