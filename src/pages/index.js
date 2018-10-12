import React from 'react'
import { graphql } from 'gatsby'
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
			<Layout siteTitle={siteTitle} description={siteDescription}>
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<Carousel width={1000} height={400}>
					<img src={`http://placehold.it/1000x400/ccc/999/&text=slide1`} />
					<img src={`http://placehold.it/1000x400/ccc/999/&text=slide2`} />
					<img src={`http://placehold.it/1000x400/ccc/999/&text=slide3`} />
				</Carousel>
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