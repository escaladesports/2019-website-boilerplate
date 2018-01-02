import React from 'react'
import { Provider, useStaticRendering } from 'mobx-react'
import { renderToString } from 'react-dom/server'
import stores from '../../gatsby-mobx-config.js'

exports.replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
	useStaticRendering(true)

	const ProviderBody = () => (
		<Provider {...stores}>
			{bodyComponent}
		</Provider>
	)

	replaceBodyHTMLString(renderToString(<ProviderBody />))
}