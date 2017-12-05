import React from 'react'
import Img from 'gatsby-image'

export default class Index extends React.Component {
	render() {
		console.log(this.props.data)
		return (
			<section>
				<div>Image:</div>
				<div className='container'>
					<Img sizes={this.props.data.file.childImageSharp.sizes} />
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
    file(relativePath: { eq: "test.jpg" }) {
      childImageSharp {
			sizes(maxWidth: 300) {
				...GatsbyImageSharpSizes_noBase64
			}
      }
    }
  }
`

