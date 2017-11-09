import React from 'react'
import Layout from 'components/_layout'
import cloudinary from 'utils/images/cloudinary'
import IsAvailable from 'components/utils/product/is-available'
import AddToCart from 'components/utils/product/add-cart-button'
import getProduct from 'utils/product/get-product'
import VariantSwitcher from 'components/product/variant-switcher'
import VariantFinishes from 'components/product/variant-finishes'
import Router from 'next/router'
import Price from 'components/utils/product/price'
import titleCase from 'title-case'
import Img from 'components/utils/image'
import unpackVariants from 'utils/product/unpack-variants'
import Loader from 'components/loader'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
		this.changeProduct = this.changeProduct.bind(this)
	}
	static async getInitialProps(req) {
		let product = getProduct(req.query.id)
		return { product: product }
	}
	componentWillMount(){
		this.setState({
			product: this.props.product,
			variants: unpackVariants(this.props.product)
		})
	}
	changeProduct(product){
		this.setState({
			product: product
		})
		Router.replace(`/product?id=${product.id}`, `/product/${product.id}`, { shallow: true })
	}
	render(){
		return(
			<Layout>
				<h1>{this.state.product.title}</h1>
				{this.state.product.images && this.state.product.images.length &&
					<Img
						srcSet={`
							${cloudinary(this.state.product.images[0], 'w_230', 'h_460', 'c_pad')} 230w,
							${cloudinary(this.state.product.images[0], 'w_400', 'h_800', 'c_pad')} 400w,
							${cloudinary(this.state.product.images[0], 'w_500', 'h_1000', 'c_pad')} 500w
						`}
						src={cloudinary(this.state.product.images[0], 'w_230', 'h_460', 'c_pad')}
						width={500}
						height={1000}
						alt={this.state.product.title}
						loading={<Loader />}
						/>
				}
				<VariantSwitcher
					product={this.state.product}
					variants={this.state.variants}
					onChange={this.changeProduct} >

					<VariantFinishes
						product={this.state.product}
						variants={this.state.variants} />

				</VariantSwitcher>
				<div className='price'>
					Price: <Price product={this.state.product} />
				</div>
				<IsAvailable id={this.state.product.id}>
					<AddToCart
						name={this.state.product.title}
						id={this.state.product.id}
						url={`/product/${this.state.product.id}`}
						price={this.state.product.price}
						img={cloudinary(this.state.product.images[0], 'w_150', 'h_150', 'c_pad')}
						desc={titleCase(`${this.state.product.finish} Finish`)}
					/>
				</IsAvailable>
			</Layout>
		)
	}
}
