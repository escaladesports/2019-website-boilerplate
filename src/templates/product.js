import React from 'react'
import Head from 'components/head'

class ProductTemplate extends React.Component {
	render() {
		const fm = this.props.data.markdown.frontmatter
		const salsify = this.props.data.salsify
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
		salsify: salsifyContent(id: { eq: $id }){
			itemName
		}
		markdown: markdownRemark(fields: { id: { eq: $id } }){
			frontmatter {
				title
			}
		}
	}
`