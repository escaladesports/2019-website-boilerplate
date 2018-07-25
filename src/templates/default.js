import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

class DocsTemplate extends React.Component{
	render(){
		const data = this.props.data
		const content = data.markdownRemark
		const fm = content.frontmatter
		const title = fm.title ? fm.title : content.fields.title
		console.log(this.props)
		return(
			<Fragment>
				<Helmet>
					<title>{title} · {data.site.siteMetadata.title}</title>
					<meta name='description' content={content.excerpt} />
				</Helmet>
				<section>
					<div dangerouslySetInnerHTML={{ __html: content.html }} />
				</section>
				<style jsx>{`
					@import 'src/css';
				`}</style>
			</Fragment>
		)
	}
}

export default DocsTemplate

export const query = graphql`
	query DocsTemplateQuery($slug: String!) {
		markdownRemark(fields: {
			slug: { eq: $slug }
		}){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
			}
		}
		site {
			siteMetadata {
				title
			}
		}
	}
`
