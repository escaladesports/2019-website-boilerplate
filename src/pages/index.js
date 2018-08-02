import React from 'react'
import { css } from 'emotion'
import Layout from '../components/layout'
import buttonStyles from '../styles/mixins/button'

export default class HomePage extends React.Component {
	render() {
		const { html } = this.props.data.markdownRemark
		return (
			<Layout>
				<div className={divStyles} dangerouslySetInnerHTML={{ __html: html }} />
				<button className={buttonStyles}>Test</button>
			</Layout>
		)
	}
}

const divStyles = css({
	transition: `transform 1s`,
})

export const query = graphql`
	query HomePage {
		markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/index.md/"
		}){
			html
		}
	}
`