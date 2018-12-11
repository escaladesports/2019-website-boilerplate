import React from 'react'
import { renderEmail } from 'react-html-email'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { renderStylesToString } from 'emotion-server'
import Test from '../pages/email-templates/contact'

export async function handler(){

	const bodyText = renderStylesToString(
		renderToString(<Test />)
	)
	const helmet = Helmet.renderStatic()
	const html = renderEmail(
		<html {...helmet.htmlAttributes.toComponent()}>
			<head>
				{helmet.title.toComponent()}
				{helmet.meta.toComponent()}
				{helmet.link.toComponent()}
				{helmet.style.toComponent()}
			</head>
			<body
				{...helmet.bodyAttributes.toComponent()}
				dangerouslySetInnerHTML={{ __html: bodyText}}
			/>
		</html>
	)

	return {
		statusCode: 200,
		body: html,
	}

}