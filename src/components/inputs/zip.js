import React from 'react'
import isValidZip from 'is-valid-zip'
import Input from 'components/inputs/input'

function validate(value) {
	if (!isValidZip(value)) {
		return `Please enter a valid zip code`
	}
}

export default class ZipInput extends React.Component{
	static defaultProps = {
		label: `Zip Code`,
		name: `zip`,
		autoComplete: `postal-code`,
		validate,
	}
	render(){
		return (
			<Input {...this.props} />
		)
	}
}