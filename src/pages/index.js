import React from 'react'
import Img from 'gatsby-image'

export default class Index extends React.Component {
	render() {
		console.log(this.props.data)
		const img = this.props.data.testFile.childImageSharp
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
	query GatsbyImageSampleQuery {
		testFile: file(relativePath: { eq: "test.jpg" }) {
			childImageSharp {
				sizes(maxWidth: 300) {
					...GatsbyImageSharpSizes_noBase64
				}
			}
		}
	}
`

