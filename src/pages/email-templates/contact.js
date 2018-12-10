import React from 'react'
import { Item } from 'react-html-email'
import { to_html } from 'mustache'
import Layout from '../../templates/backend-email'
import { title, body } from '.cache/contentful-contact-email.json'

export default class ContactEmail extends React.Component {
	render() {
		return (
			<Layout title={title}>
				<Item>
					<div dangerouslySetInnerHTML={{
						__html: to_html(body, this.props),
					}} />
				</Item>
			</Layout>
		)
	}
}
