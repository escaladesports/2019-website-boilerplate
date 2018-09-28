import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import buttonStyles from '../styles/mixins/button'
import Layout from '../components/layouts/default'
import Modal from '../components/modal'

export default class HomePage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: false,
		}
	}
	render() {
		const {
			page: {
				html,
			},
			site: {
				frontmatter: {
					siteTitle,
					siteDescription,
				},
			},
		} = this.props.data

		return (
			<Layout>
				<Helmet>
					<title>{siteTitle}</title>
					<meta name='description' content={siteDescription} />
				</Helmet>
				<div dangerouslySetInnerHTML={{ __html: html }} />

				<button
					onClick={() => this.setState({ open: true })}
					className={buttonStyles}
				>
					Test
				</button>
				<Modal
					open={this.state.open}
					onClose={() => this.setState({ open: false })}
				>
					<div>Modal content</div>
				</Modal>
			</Layout>
		)
	}
}

export const query = graphql`
	query HomePage {
		page: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/index.md/"
		}){
			html
		}
		site: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/settings/site.md/"
		}){
			frontmatter{
				siteTitle
				siteDescription
			}
		}
	}
`