import React from 'react'
import Img from 'gatsby-image'

export default class Index extends React.Component {
	render() {
		console.log(this.props)
		const img = this.props.data.testFile
		return (
			<section>
				<div>Image:</div>
				<div className='container'>
					<Img sizes={img.sizes} />
				</div>
				<style jsx>{`
					.container{
						max-width: 300px;
					}
				`}</style>
			</section>
		)
	}
}


// MSRP
export const pageQuery = graphql`
	query HomepageQueries {
		salsify: allSalsifyContent {
			edges {
				node {
					price: MSRP
				}
			}
		}
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

