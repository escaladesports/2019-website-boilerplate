import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layouts/default'

export default class PrivacyPolicyPage extends React.Component{
	render(){
		const {
			contentfulSettings: {
				address: {
					childMarkdownRemark: {
						html: address,
					},
				},
				email,
			},
			contentfulPage: {
				title,
				body: {
					childMarkdownRemark: {
						html,
						excerpt,
					},
				},
			},
		} = this.props.data
		const addressHTML = address.replace(/\n/g, `<br />`)
		const emailHTML = `<a href='mailto:${email}'>${email}</a>`
		const processedHTML = html
			.replace(/{{address}}/g, addressHTML)
			.replace(/{{email}}/g, emailHTML)

		return(
			<Layout title={title} description={excerpt}>
				<div dangerouslySetInnerHTML={{ __html: processedHTML }} />
			</Layout>
		)
	}
}

export const query = graphql`
	query PrivacyPolicyPage {
		contentfulSettings{
			address{
				childMarkdownRemark{
					html
				}
			}
			email
		}
		contentfulPage(slug: { eq: "privacy-policy" }){
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
