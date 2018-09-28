import React from 'react'
import CurrencyInput from 'react-currency-masked-input'
import formatUSD from '../../functions/format-usd'

export class CurrencyControl extends React.Component{
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e){
		const value = parseInt(e.target.value.replace(`.`, ``))
		this.props.onChange(value)
	}
	render(){
		const {
			value,
			classNameWrapper,
			forID,
			setActiveStyle,
			setInactiveStyle,
		} = this.props
		let defaultValue = parseInt(value)
		if (defaultValue){
			defaultValue = defaultValue / 100
		}
		return (
			<CurrencyInput
				onFocus={setActiveStyle}
				onBlur={setInactiveStyle}
				onChange={this.handleChange}
				defaultValue={defaultValue || 0}
				id={forID}
				className={classNameWrapper}
			/>
		)
	}
}

export class CurrencyPreview extends React.Component{
	render(){
		return (
			<div>{formatUSD(this.props.value)}</div>
		)
	}
}