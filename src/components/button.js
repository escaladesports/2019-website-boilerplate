import React from 'react'
import { css } from 'emotion'
import { mixins } from '../styles/config'

export default class Button extends React.Component {
	render() {
		return (
			<button
				className={css({
					...mixins.button,
				})}
				onClick={this.props.onClick}
			>
				{this.props.children}
			</button>
		)
	}
}