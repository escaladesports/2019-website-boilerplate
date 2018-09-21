import React from 'react'
import Field from 'components/inputs/field'

export default class Checkbox extends React.Component{
	static defaultProps = {
		type: `checkbox`,
		required: false,
	}
	render(){
		return (
			<Field {...this.props}>
				{props => (
					<input {...props} type='checkbox' />
				)}
			</Field>
		)
	}
}