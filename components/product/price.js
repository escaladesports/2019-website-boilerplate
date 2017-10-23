import React from 'react'
import { addPriceEvent, removePriceEvent } from 'utils/product/set-price'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
		this.setPrice = this.setPrice.bind(this)
	}
	componentDidMount(){
		if (window.productPrices){
			this.setPrice(window.productPrices)
		}
		else{
			this.setState({ price: this.props.product.price })
		}
		addPriceEvent(this.setPrice)
	}
	componentWillUnmount() {
		removePriceEvent(this.setPrice)
	}
	setPrice(prices){
		if (prices[this.props.product.id] && this.state.price != prices[this.props.product.id]) {
			this.setState({ price: prices[this.props.product.id] })
		}
	}
	render(){
		return (
			<span>{this.state.price || this.props.product.price}</span>
		)
	}
}
