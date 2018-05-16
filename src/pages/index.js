import React from 'react'
import Img from 'gatsby-image'

export default class Index extends React.Component {
	render() {
		const img = this.props.data.testFile
		return (
			<section className={this.props.status}>
				<div>Image:</div>
				<div className='container'>
					<Img sizes={img.sizes} />
				</div>
				<style jsx>{`
					:root{
						--width: 300px;
					}
					section{
						.container{
							width: var(--width);
							margin-left: var(--width);
						}
					}
				`}</style>
			</section>
		)
	}
}


export const pageQuery = graphql`
	query HomepageQueries {
		productData: allMarkdownRemark {
			edges {
				node {
					html
					frontmatter {
						title
					}
				}
			}
		}
		testFile: imageSharp(id: { regex: "/test.jpg/" }) {
			sizes(maxWidth: 300) {
				...GatsbyImageSharpSizes_noBase64
			}
		}
	}
`
