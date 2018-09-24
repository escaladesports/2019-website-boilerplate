import React from 'react'
import isEmail from 'is-email'
import Input from './input'

function validate(value) {
	if (!isEmail(value)) {
		return `Please enter a valid email`
	}
}

export default class EmailInput extends React.Component{
	static defaultProps = {
		label: `Email`,
		name: `email`,
		autoComplete: `email`,
		validate,
	}
	render(){
		return (
			<Input {...this.props} />
		)
	}
}