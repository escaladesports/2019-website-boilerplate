import React from 'react'
import raf from 'raf'
import dirtyCheck from './dirty-check-cart-qty'

export default class CartQty extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			qty: 0
		}
		this.onChange = this.onChange.bind(this)
	}
	onChange(qty){
		this.setState({
			qty: qty
		})
	}
	componentDidMount(){
		this.setState({
			qty: dirtyCheck.getQty()
		})
		dirtyCheck.addChangeEvent(this.onChange)
	}
	componentWillUnmount() {
		dirtyCheck.removeChangeEvent(this.onChange)
	}
	render(){
		return(
			<span>{this.state.qty}</span>
		)
	}
}