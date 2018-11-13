import React from 'react'
import { Item } from 'react-html-email'
import grayMatter from 'gray-matter'
import { Converter } from 'showdown'
import { to_html } from 'mustache'
import Layout from '../../templates/backend-email'
import md from 'raw-loader!../../markdown/email/contact.md'

const data = grayMatter(md)
const { title } = data.data
const template = (new Converter()).makeHtml(data.content)

export default class ContactEmail extends React.Component {
	render() {
		return (
			<Layout title={title}>
				<Item>
					<div dangerouslySetInnerHTML={{
						__html: to_html(template, this.props),
					}} />
				</Item>
			</Layout>
		)
	}
}
