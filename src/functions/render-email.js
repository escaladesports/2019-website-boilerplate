import React from 'react'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import IdentityEmail from '../pages/email-templates/invitation'

export function handler(_, __, callback){
	let html = renderToString(<IdentityEmail />)
	const helmet = Helmet.renderStatic()
	html = renderStylesToString(html)
	html = `
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html ${helmet.htmlAttributes.toString()}>
			<head>
				${helmet.title.toString()}
				${helmet.meta.toString()}
				${helmet.link.toString()}
				${helmet.style.toString()}
			</head>
			<body ${helmet.bodyAttributes.toString()}>
				${html}
			</body>
		</html>
	`
	callback(null, {
		statusCode: 200,
		body: html,
	})
}