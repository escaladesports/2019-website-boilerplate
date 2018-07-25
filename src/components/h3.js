import React from 'react'

class H3 extends React.Component {
	render() {
		return (
			<h3>
				{this.props.children}
				<style jsx>{`
					@import 'src/css';
					h3{
						@apply --h3Mixin;
					}
				`}</style>
			</h3>
		)
	}
}

export default H3