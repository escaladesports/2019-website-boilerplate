import React from 'react'
import Layout from '../components/layout'

export default class HomePage extends React.Component {
	render() {
		const { html } = this.props.data.markdownRemark
		return (
			<Layout>
				<div dangerouslySetInnerHTML={{ _html: html }} />
			</Layout>
		)
	}
}

export const query = graphql`
	query HomePage {
		markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/index.md/"
		}){
			html
		}
	}
`