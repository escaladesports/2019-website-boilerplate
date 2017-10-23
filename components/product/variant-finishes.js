import React from 'react'
import Head from 'next/head'
import env from 'json/env.json'
import titleCase from 'title-case'

const property = 'finish'

function variantSorter(a, b){
	return a[property] > b[property]
}

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
		this.sortVariants = this.sortVariants.bind(this)
	}
	componentWillMount(){
		this.sortVariants(this.props)
	}
	componentWillReceiveProps(props) {
		this.sortVariants(props)
	}
	sortVariants(props) {
		let variants = []
		for(let i in props.variants){
			variants.push(props.variants[i])
		}
		this.setState({
			variants: variants.sort(variantSorter)
		})
	}
	render(){
		return (
			<div>{this.state.variants &&
				<select name={property} defaultValue={this.props.product[property]}>
					{this.state.variants.map((variant, key) => {
						return <option
							key={variant[property]}
							value={variant[property]}>
								{titleCase(variant[property])}
						</option>
					})}
				</select>
			}</div>
		)
	}
}
