import React from 'react'
import Router from 'next/router'

function checkMatch(obj, values){
	console.log(obj, values)
	for(let i in values){
		if(obj[i] != values[i]){
			return false
		}
	}
	return true
}

export default class extends React.Component {
	constructor(props){
		super(props)
		this.getInputEls = this.getInputEls.bind(this)
		this.findProductMatch = this.findProductMatch.bind(this)
		this.getValues = this.getValues.bind(this)
		this.changeProduct = this.changeProduct.bind(this)
	}
	componentDidMount() {
		this.getInputEls()
	}
	componentDidReceiveProps(){
		this.getInputEls()
	}
	getInputEls(){
		this.inputEls = this.form.querySelectorAll('input, select')
		for (let i = this.inputEls.length; i--;) {
			let el = this.inputEls[i]
			if (!el.classList.contains('variantProcessed')) {
				el.classList.add('variantProcessed')
				el.addEventListener('change', this.findProductMatch)
			}
		}
	}
	getValues(){
		let obj = {}
		for (let i = this.inputEls.length; i--;) {
			let el = this.inputEls[i]
			obj[el.getAttribute('name')] = el.value
		}
		return obj
	}
	findProductMatch(){
		console.log('findProductMatch()')
		let values = this.getValues()
		if(checkMatch(this.props.product, values)){
			return this.changeProduct(this.props.product.id)
		}
		if (this.props.product.variants){
			for (let i in this.props.product.variants) {
				let variant = this.props.product.variants[i]
				if (checkMatch(variant, values)) {
					return this.changeProduct(variant.id)
				}
			}
		}
		return false
	}
	changeProduct(id){
		console.log('Changing product...')
		Router.replace(`/product?id=${id}`, `/product/${id}`)
	}
	render(){
		return (
			<form ref={el => this.form = el}>
				{this.props.children}
			</form>
		)
	}
}
