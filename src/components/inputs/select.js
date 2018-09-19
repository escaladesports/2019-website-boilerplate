import React from 'react'
import Input from 'components/inputs/input'

export default class Select extends React.Component{
	static defaultProps = {
		type: `select`,
	}
	render(){
		return (
			<Input {...this.props} />
		)
	}
}