import React from 'react'
import Img from 'gatsby-image'

export default class Index extends React.Component {
	render() {
		console.log(this.props.data)
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

