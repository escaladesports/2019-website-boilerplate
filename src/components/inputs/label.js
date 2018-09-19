import React from 'react'

export default class Label extends React.Component {
	render() {
		return (
			<label>
				<span>{this.props.label}</span>
				{this.props.children}
			</label>
		)
	}
}