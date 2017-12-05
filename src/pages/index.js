import React from 'react'

export default class Index extends React.Component {
	render() {
		console.log(this.props.data)
		return (
			<section>
				<div>Image:</div>
				<img src={this.props.data.cropCenter.resize.src} />
			</section>
		)
	}
}

export const pageQuery = graphql`
	query GatsbyImageSampleQuery {
		cropCenter: imageSharp(id: { regex: "/test.jpg/" }) {
			resize(width: 180, height: 180, cropFocus: CENTER) {
				src
			}
		}
	}
`

