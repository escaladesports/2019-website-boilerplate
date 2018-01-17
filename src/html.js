import React, { Component } from 'react'
import * as PropTypes from 'prop-types'

const propTypes = {
	headComponents: PropTypes.node.isRequired,
	body: PropTypes.node.isRequired,
	postBodyComponents: PropTypes.node.isRequired,
}

console.log(process.env)

class Html extends Component {
	render() {
		return (
			<html lang="en">
				<head>
					{this.props.headComponents}
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				</head>
				<body>
					<div
						id="___gatsby"
						dangerouslySetInnerHTML={{ __html: this.props.body }}
					/>
					{this.props.postBodyComponents}
				</body>
			</html>
		)
	}
}

Html.propTypes = propTypes

module.exports = Html
