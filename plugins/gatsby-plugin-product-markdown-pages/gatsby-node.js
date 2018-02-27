const { resolve } = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

// Create dynamic page test
exports.createPages = async ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators

	const result = await graphql(`{
		allProductMarkdown{
			edges {
				node {
					productId
					category
				}
			}
		}
	}`)

	if (result.errors) {
		console.error(result.errors)
		process.exit(1)
	}

	const categories = []

	result.data.allProductMarkdown.edges.forEach(({ node }) => {
		const id = node.productId
		const lowerId = id.toLowerCase()

		// Create product page
		createPage({
			path: `/product/${lowerId}`,
			component: resolve(`./src/templates/product.js`),
			context: {
				id,
				lowerId,
				upperId: id.toUpperCase(),
			},
		})

		// Create cateogry page
		if(categories.indexOf(node.category) === -1){

		}
	})

}