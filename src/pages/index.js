import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'emotion'
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
		const { html, frontmatter } = this.props.data.page
		const { headerImage } = frontmatter
		const { siteTitle, siteDescription } = this.props.data.site.frontmatter
		return (
			<Layout>
				<Helmet>
					<title>{siteTitle}</title>
					<meta name='description' content={siteDescription} />
				</Helmet>
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<Img
					className={styles}
					sizes={headerImage.childImageSharp.sizes}
					alt="Escalade Sports"
				/>
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

const styles = css`
	margin-bottom: 30px;
`

export const query = graphql`
	query HomePage {
		page: markdownRemark(fileAbsolutePath: {
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