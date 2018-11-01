import React from 'react'
import { renderEmail } from 'react-html-email'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import { renderStylesToString } from 'emotion-server'
import Layout from '../components/layouts/email'
import Test from '../components/test-component'

export async function handler(){

	const bodyText = renderStylesToString(
		renderToString(
			<Layout title='Test Title'>
				<Test />
			</Layout>
		)
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
	console.log(html)

	return {
		statusCode: 200,
		body: html,
	}

}