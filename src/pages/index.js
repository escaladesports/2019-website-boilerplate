import React from 'react'
import { css } from 'emotion'

export default class HomePage extends React.Component {
	render() {
		return (
			<section className={styles}>
				<h1>Home Page</h1>
			</section>
		)
	}
}

const styles = css({
	padding: 30,
	h1: {
		color: `red`,
	},
})