import React from 'react'

import Head from 'components/head'

class CategoryTemplate extends React.Component {
	render() {
		console.log(this.props.data)
		return (
			<div>Category page</div>
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
					category
					title
				}
			}
		}
	}
`