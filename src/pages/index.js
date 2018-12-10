import React from 'react'
import { graphql } from 'gatsby'
import Button from '../components/button'
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
			contentfulPage: {
				body: {
					childMarkdownRemark: {
						html,
					},
				},
			},
		} = this.props.data

		return (
			<Layout>
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<Carousel width={1000} height={400}>
					<img src={`https://placehold.it/1000x400/ccc/999/&text=slide1`} />
					<img src={`https://placehold.it/1000x400/ccc/999/&text=slide2`} />
					<img src={`https://placehold.it/1000x400/ccc/999/&text=slide3`} />
				</Carousel>
				<br />
				<Button
					onClick={() => this.setState({ open: true })}
				>
					Open Modal
				</Button>
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
		contentfulPage(slug: { eq: "index" }){
			body{
				childMarkdownRemark{
					html
				}
			}
		}
	}
`