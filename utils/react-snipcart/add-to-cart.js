import React from 'react'

export default class addToCart extends React.Component{
	constructor(props){
		super(props)
		this.addToCart = this.addToCart.bind(this)
	}
	addToCart(){
		if(window.Snipcart){
			window.Snipcart.api.items.add(this.props.data)
		}
	}
	render(){
		return(
			<div style={{ position: 'inline' }} onClick={this.addToCart}>
				{this.props.children}
			</div>
		)
	}
}
