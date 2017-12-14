import React from 'react'

export default class OpenCart extends React.Component{
	constructor(props){
		super(props)
		this.openCart = this.openCart.bind(this)
	}
	openCart(){
		if(window.Snipcart){
			window.Snipcart.api.modal.show()
		}
	}
	render(){
		return(
			<div style={{ position: 'inline' }} onClick={this.openCart}>
				{this.props.children}
			</div>
		)
	}
}