import React from 'react'

exports.onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
	if (process.env.NODE_ENV === 'production' && pluginOptions.id){
		return setPostBodyComponents([
			<script key='gatsby-plugin-hubspot' type='text/javascript' id='hs-script-loader' async defer src={`//js.hs-scripts.com/${pluginOptions.id}.js`}></script>
		])
	}
	return null
}