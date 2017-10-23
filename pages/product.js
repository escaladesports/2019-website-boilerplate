import React from 'react'
import Layout from 'components/_layout'
import cloudinary from 'utils/images/cloudinary'
import AddToCart from 'components/product/add-cart-button'
import getProduct from 'utils/product/get-product'
import VariantSwitcher from 'components/product/variant-switcher'
import Router from 'next/router'
import Price from 'components/product/price'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
		this.changeProduct = this.changeProduct.bind(this)
	}
	static async getInitialProps(req) {
		return getProduct(req.query.id)
	}
	componentWillMount(){
		this.setState({
			product: this.props.product,
			variants: this.props.variants
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
					<img src={cloudinary(this.state.product.images[0], 'w_200', 'h_400', 'c_pad')} />
				}
				<VariantSwitcher product={this.state.product} variants={this.state.variants} onChange={this.changeProduct}>
					<select name='finish'>
						<option value='yellow'>Yellow</option>
						<option value='orange'>Orange</option>
						<option value='green'>Green</option>
					</select>
				</VariantSwitcher>
				<div className='price'>
					Price: $<Price product={this.state.product} />
				</div>
				<AddToCart
					name={this.state.product.title}
					id={this.state.product.id}
					url={`/product/${this.state.product.id}`}
					price={this.state.product.price}
					img={cloudinary(this.state.product.images[0], 'w_150', 'h_150', 'c_pad')}
					desc={`${this.state.product.finish} Finish`.toUpperCase()}
					/>
			</Layout>
		)
	}
}
