import React from 'react'
import raf from 'raf'

export default class CartQty extends React.Component{
	constructor(props){
		super(props)
		this.state = { qty: 0 }
		this.dirtyCheck = this.dirtyCheck.bind(this)
	}
	// Have to dirty check since SC's APIs don't yet support all actions that can change total
	// Check when supported
	dirtyCheck() {
		if(this.mounted) {
			if(window.Snipcart){
				let qty = window.Snipcart.api.items.count()
				if(this.state.qty !== qty) {
					this.setState({ qty: qty })
				}
			}
			raf(this.dirtyCheck)
		}
	}
	componentDidMount(){
		this.mounted = true
		raf(this.dirtyCheck)
	}
	componentWillUnmount(){
		this.mounted = false
	}
	render(){
		return(
			<span>{this.state.qty}</span>
		)
	}
}