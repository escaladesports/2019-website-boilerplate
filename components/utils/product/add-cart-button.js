import React from 'react'
import env from 'json/env.json'
import zygoteRefresh from 'utils/next/zygote-refresh'
import { addPriceEvent, removePriceEvent } from 'utils/product/set-price'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = { price: false }
		this.setPrice = this.setPrice.bind(this)
	}
	componentDidMount() {
		if (window.productPrice) {
			this.setPrice(window.productPrice)
		}
		addPriceEvent(this.setPrice)
	}
	componentWillUnmount() {
		removePriceEvent(this.setPrice)
	}
	setPrice(price) {
		this.setState({ price: price })
		zygoteRefresh()
	}
	componentDidUpdate() {
		zygoteRefresh()
	}
	render() {
		return (
			<div
				role='button'
				style={this.props.style || {}}
				onClick={this.props.handleClick}
				data-id={this.props.id}
				data-name={this.props.name}
				data-price={(this.state.price && this.state.price[this.props.id]) ? this.state.price[this.props.id] : this.props.price}
				data-img={this.props.img}
				data-url={this.props.url}
				data-desc={this.props.desc}
				data-qty={this.props.qty}
				data-open-cart
			>
				{this.props.children || <button>Add to Cart</button>}
				<style jsx>{`
					div{
						display: inline-block;
					}
				`}</style>
			</div>
		)
	}
}