import React from 'react'
import Input from 'components/inputs/input'
import isPhone from 'is-phone'

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
		validate,
	}
	render(){
		return (
			<Input {...this.props} />
		)
	}
}