import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'

export default class GenericTemplate extends React.Component{
	render(){
		const {
			page: {
				frontmatter: {
					title,
				},
				html,
				excerpt,
			},
		} = this.props.data

		return(
			<Layout title={title} description={excerpt}>
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</Layout>
		)
	}
}

export const query = graphql`
	query GenericTemplate($id: String!) {
		page: markdownRemark(
			id: { eq: $id }
		){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}
	}
`
