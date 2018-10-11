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
			site: {
				siteMetadata: {
					siteTitle,
				},
			},
		} = this.props.data

		return(
			<Layout title={title} siteTitle={siteTitle} description={excerpt}>
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

		site{
			siteMetadata{
				siteTitle: title
			}
		}
	}
`
