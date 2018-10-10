import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import buttonStyles from '../styles/mixins/button'
import Layout from '../components/layouts/default'
import Modal from '../components/modal'
import Carousel from '../components/carousel'

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
				siteMetadata: {
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
				<Carousel />
				<button
					onClick={() => this.setState({ open: true })}
					className={buttonStyles}
				>
					Open Modal
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
		site{
			siteMetadata{
				siteTitle: title
				siteDescription: description
			}
		}
	}
`