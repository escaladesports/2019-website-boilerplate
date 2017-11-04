import React from 'react'
import settings from 'components/_settings'
import fetch from 'isomorphic-fetch'
import env from 'json/env.json'
import zygoteRefresh from 'utils/next/zygote-refresh'
import { addStockEvent, removeStockEvent } from 'utils/product/set-stock'
import { addPriceEvent, removePriceEvent } from 'utils/product/set-price'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stock: false,
			price: false
		}
		this.setStock = this.setStock.bind(this)
		this.setPrice = this.setPrice.bind(this)
	}
	componentDidMount() {
		if (window.productStock){
			this.setStock(window.productStock)
		}
		if(window.productPrice){
			this.setPrice(window.productPrice)
		}
		addStockEvent(this.setStock)
		addPriceEvent(this.setPrice)
	}
	componentWillUnmount(){
		removeStockEvent(this.setStock)
		removeStockEvent(this.setPrice)
	}
	setStock(stock) {
		this.setState({ stock: stock })
		zygoteRefresh()
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
			<div>
				{this.state.stock[this.props.id] > 0 &&
					<button
						className={this.state.stock === false && 'loading'}
						style={this.props.style || {}}
						onClick={this.props.handleClick}
						data-id={this.props.id}
						data-name={this.props.name}
						data-price={(this.state.price && this.state.price[this.props.id]) ? this.state.price[this.props.id] : this.props.price}
						data-img={this.props.img}
						data-url={this.props.url}
						data-desc={this.props.desc}
						data-qty={this.props.quantity}
						data-open-cart
					>
						Add to Cart
					</button>
				}
				{this.state.stock[this.props.id] === 0 &&
					<span>Out of Stock</span>
				}
				<style jsx>{`
					button {
						border: 0;
						padding: 0.7rem 2rem;
						font-size: 1.7rem;
						text-transform: uppercase;
						color: #fff;
						cursor: pointer;
					}
					.loading{
						visibility: hidden;
					}
					span{
						text-transform: uppercase;
					}
				`}</style>
			</div>
		)
	}
}