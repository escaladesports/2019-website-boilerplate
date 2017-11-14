import React from 'react'
import env from 'json/env.json'
import { addStockEvent, removeStockEvent } from 'utils/product/set-stock'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			stock: false
		}
		this.setStock = this.setStock.bind(this)
	}
	componentDidMount() {
		if (window.productStock) {
			this.setStock(window.productStock)
		}
		addStockEvent(this.setStock)
	}
	componentWillUnmount() {
		removeStockEvent(this.setStock)
	}
	setStock(stock) {
		this.setState({ stock: stock })
	}
	render() {
		return (
			<div>
				<div className={(!env.ENABLE_ECOMMERCE || !this.state.stock[this.props.id]) ? 'hide' : ''}>
					{this.props.children}
				</div>
				{env.ENABLE_ECOMMERCE && this.state.stock[this.props.id] === 0 &&
					(this.props.outOfStock || 'Out of Stock')
				}
				<style jsx>{`
					.hide{
						display: none
					}
				`}</style>
			</div>
		)
	}
}