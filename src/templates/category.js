import React from 'react'

import Head from 'components/head'

class CategoryTemplate extends React.Component {
	render() {
		const products = this.props.data.allProductMarkdown.edges
		console.log(products)
		return (
			<div>
				<h1>{ this.props.pathContext.id } category</h1>
				<ul>
					{products.map(({ node }) => {
						return <li>{ node.title }</li>
					})}
				</ul>
			</div>
		)
	}
}

export default CategoryTemplate

export const pageQuery = graphql`
	query ProductsByCategory($id: String!) {
		allProductMarkdown(filter: {
			category: { eq: $id },
			variant: { eq: false }
		}){
			edges {
				node {
					title
				}
			}
		}
	}
`