import React from 'react'
import Img from 'gatsby-image'
import { observer, inject } from 'mobx-react'
import MobXExample from 'components/mobx-example'
import { OpenCart, AddToCart, CartQty, CartHasQty } from 'react-snipcart'
//import test from '../markdown/components/test.md'
//console.log(test)

export default class Index extends React.Component {
	render() {
		const img = this.props.data.testFile
		return (
			<section className={this.props.status}>
				{/*
				<div dangerouslySetInnerHTML={{ __html: test.__content }} />
				<MobXExample />
				*/}
				<AddToCart data={{
					id: 'ABC123',
					name: 'Test Product',
					url: '/',
					price: '499.99',
					openCart: true,
				}}>
					<div>Add to Cart</div>
				</AddToCart>
				<OpenCart>
					<CartQty />
				</OpenCart>
				<div>Image:</div>
				<div className='container'>
					<Img sizes={img.sizes} />
				</div>
				<style jsx>{`
					.container{
						width: 300px;
					}
				`}</style>
			</section>
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
