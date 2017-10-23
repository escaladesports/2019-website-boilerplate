import React from 'react'

function checkMatch(obj, values){
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
		let values = this.getValues()
		if (this.props.variants){
			for (let i in this.props.variants) {
				let variant = this.props.variants[i]
				if (checkMatch(variant, values)) {
					return this.props.onChange(variant)
				}
			}
		}
		return false
	}
	render(){
		return (
			<form ref={el => this.form = el}>
				{this.props.children}
			</form>
		)
	}
}
