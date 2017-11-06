import React from 'react'
import Img from 'components/image.js'
import cloudinary from 'utils/images/cloudinary'
import Price from 'components/util/product/price'
import IsAvailable from 'components/util/product/is-available'
import AddToCart from 'components/util/product/add-cart-button'
import titleCase from 'title-case'

export default class extends React.Component {
	render(){
		return (
			<div>
				<h2>{this.props.product.title}</h2>
				{this.props.product.images && this.props.product.images.length &&
					<Img
						src={cloudinary(this.props.product.images[0], 'w_400', 'h_600', 'c_pad')}
						width={400}
						height={600}
					/>
				}
				<div className='price'>
					Price: $<Price product={this.props.product} />
				</div>
				<IsAvailable id={this.props.product.id}>
					<AddToCart
						name={this.props.product.title}
						id={this.props.product.id}
						url={`/product/${this.props.product.id}`}
						price={this.props.product.price}
						img={cloudinary(this.props.product.images[0], 'w_150', 'h_150', 'c_pad')}
						desc={titleCase(`${this.props.product.finish} Finish`)}
					/>
				</IsAvailable>
			</div>
		)
	}
}
