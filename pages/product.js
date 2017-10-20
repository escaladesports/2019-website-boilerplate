import React from 'react'
import Layout from 'components/_layout'
import cloudinary from 'utils/images/cloudinary'
import AddToCart from 'components/add-cart-button'
import getProduct from 'utils/product/get-product'
import VariantSwitcher from 'components/variant-switcher'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	static async getInitialProps(req) {
		let props = getProduct(req.query.id)
		return props
	}
	render(){
		return(
			<Layout>
				<h1>{this.props.title}</h1>
				{this.props.images && this.props.images.length &&
					<img src={cloudinary(this.props.images[0], 'w_200')} />
				}
				<VariantSwitcher product={this.props}>
					<select name='finish'>
						<option value='yellow'>Yellow</option>
						<option value='orange'>Orange</option>
						<option value='green'>Green</option>
					</select>
				</VariantSwitcher>
				<AddToCart
					name={this.props.title}
					id={this.props.id}
					price='1.99'
					/>
			</Layout>
		)
	}
}
