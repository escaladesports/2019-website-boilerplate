import React from 'react'

class ProductTemplate extends React.Component {
	render() {
		const fm = this.props.data.markdown.frontmatter
		const salsify = this.props.data.salsify
		return (
			<div>
				<h1>{fm.title}</h1>
			</div>
		)
	}
}

export default ProductTemplate


export const pageQuery = graphql`
	query ProductById($id: String!) {
		salsify: allSalsifyContent {
			edges {
				node {
					price: MSRP
				}
			}
		}
		markdown: markdownRemark(fields: { id: { eq: $id } }){
			frontmatter {
				title
			}
		}
	}
`