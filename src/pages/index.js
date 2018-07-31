import React from 'react'
import buttonMixin from '../styles/mixins/button'
import Button from '../button'

export default class HomePage extends React.Component {
	render() {
		return (
			<section>
				<h1>Home Page</h1>
				<button className={buttonMixin}>Test Button</button>
				<Button>test</Button>

			</section>
		)
	}
}