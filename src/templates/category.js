import React from 'react'

import Head from 'components/head'

function mergeData(markdown, salsify){
	let res = []
	markdown.edges.forEach(obj => {
		obj = obj.node
		salsify.edges.forEach(({ node }) => {
			if(node.id.toUpperCase() === obj.productId.toUpperCase()){
				obj = {
					...node,
					...obj,
				}
			}
		})
		res.push(obj)
	})
	return res
}

class CategoryTemplate extends React.Component {
	render() {
		const products = mergeData(this.props.data.allProductMarkdown, this.props.data.allSalsifyContent)
		console.log(products)
		return (
			<div>
				<h1>{ this.props.pathContext.id } category</h1>
				<ul>
					{products.map(node => {
						return <li>{ node.title }</li>
					})}
				</ul>
			</div>
		)
	}
}

export default CategoryTemplate

export const pageQuery = graphql`
	query ProductsByCategory($category: String!, $regexProducts: String!) {
		allProductMarkdown(filter: {
			category: { eq: $category },
			variant: { eq: false }
		}){
			edges {
				node {
					productId
					title
				}
			}
		}
		allSalsifyContent(filter: {
			id: { regex: $regexProducts }
		}){
			edges {
				node {
					id
					webImages{
						url
					}
				}
			}
		}
	}
`