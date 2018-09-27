import React from 'react'
import { css } from 'emotion'
import CurrencyInput from 'react-currency-masked-input'

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
		return (
			<CurrencyInput
				onFocus={setActiveStyle}
				onBlur={setInactiveStyle}
				onChange={this.handleChange}
				defaultValue={value || ``}
				id={forID}
				className={`${classNameWrapper} ${styles.input}`}
			/>
		)
	}
}

export class CurrencyPreview extends React.Component{
	render(){
		return (
			<div>
				{
					(this.props.value / 100)
						.toLocaleString(`en-US`, {
							style: `currency`,
							currency: `USD`,
						})
				}
			</div>
		)
	}
}

const styles = {
	input: css`
		:before{
			content: '$';
			display: inline-block;
		}
	`,
}