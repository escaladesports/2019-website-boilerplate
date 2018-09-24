import React from 'react'
import Input from './input'

export default class NameInput extends React.Component{
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