import React from 'react'
import { css } from 'emotion'
import { mixins } from '../styles/config'

export default class HomePage extends React.Component {
	render() {
		return (
			<section>
				<h1>Home Page</h1>
				<button className={css({...mixins.button})}>Test Button</button>
			</section>
		)
	}
}