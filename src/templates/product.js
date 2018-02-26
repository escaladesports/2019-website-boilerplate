import React from 'react'

import Head from 'components/head'
import cloudinary from 'utils/cloudinary'

class ProductTemplate extends React.Component {
	render() {
		const markdown = this.props.data.productMarkdown
		const salsify = this.props.data.salsifyContent
		console.log(markdown)
		return (
			<div>
				<Head title={salsify.itemName} />
				<h1>{salsify.itemName}</h1>
				{salsify.webImages && salsify.webImages.length &&
					<img src={cloudinary(salsify.webImages[0].url, 'w_400', 'h_600', 'c_pad')} />
				}
			</div>
		)
	}
}

export default ProductTemplate


export const pageQuery = graphql`
	query ProductById($id: String!) {
		salsifyContent(id: { eq: $id }){
			itemName
			webImages{
				url
			}
		}
		productMarkdown(id: { eq: $id }){
			title
		}
	}
`