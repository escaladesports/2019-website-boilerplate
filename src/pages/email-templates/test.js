import React from 'react'
import { css } from 'emotion'
import { Item } from 'react-html-email'
import grayMatter from 'gray-matter'
import { Converter } from 'showdown'
import Layout from '../../components/layouts/email'
import md from 'raw-loader!../../markdown/contact.md'

const data = grayMatter(md)
const frontmatter = data.data
const html = (new Converter()).makeHtml(data.content)

export default class TestComponent extends React.Component{
	render(){
		return (
			<Layout title={frontmatter.title}>
				<Item>
					<div
						className={styles.test}
						dangerouslySetInnerHTML={{__html: html}}
					/>
				</Item>
			</Layout>
		)
	}
}

const styles = {
	test: css`
		color: red;
	`,
}