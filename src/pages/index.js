import React from 'react'
import Img from 'gatsby-image'
import { css } from 'emotion'
import buttonStyles from '../styles/mixins/button'
import Layout from '../components/layouts/default'
import Meta from '../components/meta'
import Modal from '../components/modal'
import InView from '../components/in-view'

export default class HomePage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open: false,
		}
	}
	render() {
		const { html, frontmatter } = this.props.data.markdownRemark
		const { headerImage } = frontmatter
		return (
			<Layout>
				<Meta />
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<Img
					className={imageStyles}
					sizes={headerImage.childImageSharp.sizes}
					alt="Escalade Sports"
				/>
				<button
					onClick={() => this.setState({ open: true })}
					className={buttonStyles}
				>
					Test
				</button>
				<div style={{marginTop: `200vh`, marginBottom: `200vh`}}>
					<InView offset={100} style={{overflow: `hidden`}}>
						{inView => (
							<div style={{
								height: 300,
								background: `#eee`,
								opacity: inView ? 1 : 0,
								transform: `translateX(${inView ? `0` : `100`}px)`,
								transition: `opacity 1s, transform 1s`,
							}}>Intersection Observer</div>
						)}
					</InView>
				</div>
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

const imageStyles = css({
	marginBottom: 30,
})

export const query = graphql`
	query HomePage {
		markdownRemark(fileAbsolutePath: {
			regex: "/src/markdown/index.md/"
		}){
			html
			frontmatter{
				headerImage{
					childImageSharp {
						sizes(maxWidth: 1600, quality: 100) {
							...GatsbyImageSharpSizes_withWebp
						}
					}
				}
			}
		}
	}
`