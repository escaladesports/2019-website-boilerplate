import React from 'react'
import isPhone from 'is-phone'
import Input from './input'

function validate(value) {
	if (!isPhone(value)) {
		return `Please enter a valid phone number`
	}
}

export default class EmailInput extends React.Component{
	static defaultProps = {
		label: `Phone Number`,
		name: `phone`,
		type: `tel`,
		autoComplete: `tel`,
		mask: `(999) 999-9999`,
		validate,
	}
	render(){
		return (
			<Input {...this.props} />
		)
	}
}