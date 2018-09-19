import React from 'react'
import Input from 'components/inputs/input'
import isEmail from 'is-email'

function validate(value) {
	if (!isEmail(value)) {
		return `Please enter a valid email`
	}
}

export default class EmailInput extends React.Component{
	static defaultProps = {
		autofill: `email`,
		validate,
	}
	render(){
		return (
			<Input {...this.props} />
		)
	}
}