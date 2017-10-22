import React from 'react'
import Layout from 'components/_layout'
import cloudinary from 'utils/images/cloudinary'
import AddToCart from 'components/add-cart-button'
import getProduct from 'utils/product/get-product'
import VariantSwitcher from 'components/variant-switcher'
import Router from 'next/router'

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
					<img src={cloudinary(this.state.product.images[0], 'w_200')} />
				}
				<VariantSwitcher product={this.state.product} variants={this.state.variants} onChange={this.changeProduct}>
					<select name='finish'>
						<option value='yellow'>Yellow</option>
						<option value='orange'>Orange</option>
						<option value='green'>Green</option>
					</select>
				</VariantSwitcher>
				<AddToCart
					name={this.state.product.title}
					id={this.state.product.id}
					price='1.99'
					/>
			</Layout>
		)
	}
}
