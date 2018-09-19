import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layouts/default'
import Meta from 'components/meta'

export default class GenericTemplate extends React.Component{
	render(){
		const {
			frontmatter,
			html,
			excerpt,
		} =  this.props.data.markdownRemark
		const { title } = frontmatter
		return(
			<Layout>
				<Meta
					title={title}
					description={excerpt}
				/>
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</Layout>
		)
	}
}

export const query = graphql`
	query GenericTemplate($id: String!) {
		markdownRemark(
			id: { eq: $id }
		){
			fileAbsolutePath
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}
	}
`
