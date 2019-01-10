import React from 'react'
import buttonStyles from '../styles/mixins/button'

export default class Button extends React.Component{
	render(){
		const { children, ...props } = this.props
		return (
			<button css={buttonStyles} {...props}>
				{children}
			</button>
		)
	}
}