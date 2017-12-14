import React from 'react'
import raf from 'raf'
import dirtyCheck from './dirty-check-cart-qty'

export default class CartHasQty extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hasQty: false
		}
		this.onChange = this.onChange.bind(this)
	}
	onChange(qty) {
		let hasQty = qty ? true : false
		if (hasQty !== this.state.hasQty) {
			this.setState({
				hasQty: hasQty
			})
		}
	}
	componentDidMount() {
		dirtyCheck.addChangeEvent(this.onChange)
	}
	componentWillUnmount() {
		dirtyCheck.removeChangeEvent(this.onChange)
	}
	render() {
		return (
			<div>{
				this.state.hasQty ?
				this.props.children :
				this.props.noQty
			}</div>
		)
	}
}