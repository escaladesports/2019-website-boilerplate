import React from 'react'

let warning = false

exports.onRenderBody = ({ setPostBodyComponents }, options = {}) => {
	options = Object.assign({
		apiKey: process.env.GATSBY_SNIPCART_API_KEY,
		js: 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
		jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js',
		styles: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
	}, options)

	if(!options.apiKey && !warning){
		if (!warning) {
			warning = true
			console.log('No Snipcart API key found')
		}
		return
	}

	const components = [
		<script key='snipcartJs' src={options.js} id="snipcart" data-api-key={options.apiKey}></script>
	]
	if(options.jquery){
		components.unshift(<script key='snipcartJquery' src={options.jquery}></script>)
	}
	if(options.defaultStyles){
		components.push(<link key='snipcartStyle' href={options.styles} type="text/css" rel="stylesheet" />)
	}

	return setPostBodyComponents(components)
}