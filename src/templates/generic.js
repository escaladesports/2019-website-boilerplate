import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'

export default class GenericTemplate extends React.Component{
	render(){
		const {
			title,
			body: {
				childMarkdownRemark: {
					html,
					excerpt,
				},
			},
		} = this.props.data.contentfulPage



		return(
			<Layout
				title={title}
				description={excerpt}
			>
				<div dangerouslySetInnerHTML={{
					__html: html,
				}} />
			</Layout>
		)
	}
}

export const query = graphql`
	query GenericTemplate($id: String!) {
		contentfulPage(
			id: { eq: $id }
		){
			title
			body{
				childMarkdownRemark{
					html
					excerpt(pruneLength: 175)
				}
			}
		}
	}
`
