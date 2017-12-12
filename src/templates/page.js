import React from 'react'
import Head from 'components/head'

export default class MainTemplate extends React.Component {
	render() {
		return (
			<main>
				<Head title={this.props.title} description={this.props.description} />
				<div>Page template:</div>
				{this.props.children}
			</main>
		)
	}
}