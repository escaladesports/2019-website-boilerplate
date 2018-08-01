import React from 'react'
import Layout from '../components/layout'

export default class HomePage extends React.Component {
	render() {
		return (
			<Layout>
				<div dangerouslySetInnerHTML={{
					__html: this.props.data.markdownRemark.html,
				}} />
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