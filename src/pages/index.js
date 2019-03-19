import React from 'react'
import { graphql } from 'gatsby'
import Img from '../components/netlify-image'
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
			page: {
				html,
				frontmatter: {
					headerImage,
					headerImageDesc,
				},
			},
		} = this.props.data

		return (
			<Layout>
				<div dangerouslySetInnerHTML={{ __html: html }} />

				<Carousel ratio={[1000, 400]}>
					<img src='https://placehold.it/1000x400/ccc/999/&text=slide1' alt='Slide 1' />
					<img src='https://placehold.it/1000x400/ccc/999/&text=slide2' alt='Slide 2' />
					<img src='https://placehold.it/1000x400/ccc/999/&text=slide3' alt='Slide 3' />
				</Carousel>

				<br />

				<Img
					src={headerImage}
					width={404}
					height={405}
					alt={headerImageDesc}
				/>

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
		page: markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/index.md/"
		}){
			html
			frontmatter{
				headerImage
				headerImageDesc
			}
		}
	}
`