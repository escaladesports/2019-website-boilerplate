import React from 'react'
import Img from 'gatsby-image'
import { observer, inject } from 'mobx-react'
import MobXExample from 'components/mobx-example'
import { OpenCart, AddToCart, CartQty, CartHasQty } from 'react-snipcart'
import TimeLimit from 'components/time-limit'

export default class Index extends React.Component {
	render() {
		console.log('Home page:', this.props.status)
		const img = this.props.data.testFile
		return (
			<section className={this.props.status}>
				<TimeLimit to='2018-01-04'>Before.</TimeLimit>
				<TimeLimit from='2018-01-04'>After.</TimeLimit>
				{/*
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
