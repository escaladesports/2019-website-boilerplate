import React from 'react'

class Button extends React.Component {
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

export default Button