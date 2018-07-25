import React from 'react'

class H2 extends React.Component {
	render() {
		return (
			<h2>
				{this.props.children}
				<style jsx>{`
					@import 'src/css';
					h2{
						@apply --h2Mixin;
					}
				`}</style>
			</h2>
		)
	}
}

export default H2