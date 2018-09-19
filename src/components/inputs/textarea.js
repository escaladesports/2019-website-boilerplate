import React from 'react'
import Input from 'components/inputs/input'

export default class TextArea extends React.Component{
	static defaultProps = {
		label: `Message`,
		name: `message`,
		type: `textarea`,
	}
	render(){
		return (
			<Input {...this.props} />
		)
	}
}