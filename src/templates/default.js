import React, { Fragment } from 'react'
import Meta from '../components/meta'

export default class DefaultTemplate extends React.Component{
	render(){
		const {
			frontmatter,
			html,
			excerpt,
		} =  this.props.data.markdownRemark
		console.log(frontmatter)
		return(
			<Fragment>
				<Meta
					title={frontmatter.title}
					description={excerpt}
				/>
				<section>
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</section>
			</Fragment>
		)
	}
}

export const query = graphql`
	query DefaultTemplate($slug: String!) {
		markdownRemark(fields: {
			slug: { eq: $slug }
		}){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
				image{
					childImageSharp {
						sizes(maxWidth: 550) {
							...GatsbyImageSharpSizes_withWebp
						}
					}
				}
			}
		}
	}
`
