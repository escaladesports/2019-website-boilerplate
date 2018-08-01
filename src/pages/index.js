import React from 'react'
import buttonMixin from '../styles/mixins/button'
import Layout from '../components/layout'

export default class HomePage extends React.Component {
	render() {
		return (
			<Layout>
				<h1>Home Page</h1>
				<button className={buttonMixin}>Test Button</button>
			</Layout>
		)
	}
}