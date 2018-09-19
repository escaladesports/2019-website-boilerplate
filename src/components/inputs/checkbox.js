import React from 'react'
import Input from 'components/inputs/input'

export default class Checkbox extends React.Component{
	static defaultProps = {
		label: `Name`,
		name: `name`,
		autoComplete: `name`,
	}
	render(){
		return (
			<Input {...this.props} />
		)
	}
}