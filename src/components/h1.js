import React from 'react'

export default class H1 extends React.Component {
	render() {
		return (
			<h1>
				{this.props.children}
				<style jsx>{`
					@import 'src/css';
					h1{
						@apply --h1Mixin;
					}
				`}</style>
			</h1>
		)
	}
}