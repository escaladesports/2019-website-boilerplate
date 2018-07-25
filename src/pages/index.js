import React, { Fragment } from 'react'

export default class HomePage extends React.Component {
	render() {
		return (
			<Fragment>
				<section>
					<div>Home Page</div>
				</section>
				<style jsx>{`
					@import 'src/css';
				`}</style>
			</Fragment>
		)
	}
}