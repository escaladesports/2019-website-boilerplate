import React from 'react'
import Head from 'components/head'

class ProductTemplate extends React.Component {
	render() {
		const fm = this.props.data.markdownRemark.frontmatter
		const salsify = this.props.data.salsifyContent
		return (
			<div>
				<Head title={salsify.itemName} />
				<h1>{salsify.itemName}</h1>
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
		markdownRemark(fields: { id: { eq: $id } }){
			frontmatter {
				title
			}
		}
	}
`