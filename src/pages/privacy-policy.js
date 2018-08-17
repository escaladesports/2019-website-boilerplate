import React from 'react'
import Layout from '../components/layouts/default'
import Meta from '../components/meta'

export default class GridPage extends React.Component{
	render(){
		const { html, excerpt, frontmatter } = this.props.data.markdownRemark
		const { title, address, email } = frontmatter
		const addressHTML = address.replace(/\n/g, `<br />`)
		const emailHTML = `<a href='mailto:${email}'>${email}</a>`
		const processedHTML = html
			.replace(/{{address}}/g, addressHTML)
			.replace(/{{email}}/g, emailHTML)
		return(
			<Layout>
				<Meta title={title} description={excerpt} />
				<div dangerouslySetInnerHTML={{ __html: processedHTML }} />
			</Layout>
		)
	}
}

export const query = graphql`
	query PrivacyPolicyTemplate {
		markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/privacy-policy.md/"
		}){
			html
			excerpt(pruneLength: 175)
			frontmatter{
				title
				address
				email
			}
		}
	}
`
