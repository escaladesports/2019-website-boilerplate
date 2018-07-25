import React from 'react'

export default class Button extends React.Component {
	render() {
		return (
			<button onClick={this.props.onClick}>
				{this.props.children}
				<style jsx>{`
					@import 'src/css';
					button{
						@apply --buttonMixin;
					}
				`}</style>
			</button>
		)
	}
}