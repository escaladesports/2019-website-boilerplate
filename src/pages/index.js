import React from 'react'
import Img from 'gatsby-image'
import Template from 'templates/default'
import Link from 'gatsby-link'

export default class Index extends React.Component {
	render() {
		const img = this.props.data.testFile
		return (
			<Template>
				<div>Image:</div>
				<div className='container'>
					<Img sizes={img.sizes} />
				</div>
				<Link to='/test'>Another page</Link>
				<Link to='/product/u2508'>Product page</Link>
				<style jsx>{`
					.container{
						width: 300px;
					}
				`}</style>
			</Template>
		)
	}
}


// MSRP
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
