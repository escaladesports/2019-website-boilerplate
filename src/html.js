import React, { Component } from 'react'
import * as PropTypes from 'prop-types'

console.log(process.env)

const propTypes = {
	headComponents: PropTypes.node.isRequired,
	body: PropTypes.node.isRequired,
	postBodyComponents: PropTypes.node.isRequired,
}

class Html extends Component {
	render() {
		return (
			<html op="news" lang="en">
				<head>
					{this.props.headComponents}
					<meta name="referrer" content="origin" />
					<meta charSet="utf-8" />
					<meta
						name="description"
						content="Priceline/API Checker"
					/>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<title>Priceline/API Checker</title>
				</head>
				<body>
					<div
						id="___gatsby"
						dangerouslySetInnerHTML={{ __html: this.props.body }}
					/>
					{this.props.postBodyComponents}
					{process.env.GATSBY_SNIPCART_API_KEY &&
						<div>
							<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
							<script src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" id="snipcart" data-api-key={process.env.SNIPCART_API_KEY}></script>
							<link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" type="text/css" rel="stylesheet" />
						</div>
					}
				</body>
			</html>
		)
	}
}

Html.propTypes = propTypes

module.exports = Html
