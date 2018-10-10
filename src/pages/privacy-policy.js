import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import Layout from '../components/layouts/default'

export default class PrivacyPolicyPage extends React.Component{
	render(){
		const {
			page: {
				frontmatter: {
					title,
					address,
					email,
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
		const addressHTML = address.replace(/\n/g, `<br />`)
		const emailHTML = `<a href='mailto:${email}'>${email}</a>`
		const processedHTML = html
			.replace(/{{address}}/g, addressHTML)
			.replace(/{{email}}/g, emailHTML)

		return(
			<Layout>
				<Helmet>
					<title>{`${title} | ${siteTitle}`}</title>
					<meta name='description' content={excerpt} />
				</Helmet>
				<div dangerouslySetInnerHTML={{ __html: processedHTML }} />
			</Layout>
		)
	}
}

export const query = graphql`
	query PrivacyPolicyPage {
		page: markdownRemark(fileAbsolutePath: {
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

		site{
			siteMetadata{
				siteTitle: title
			}
		}
	}
`
