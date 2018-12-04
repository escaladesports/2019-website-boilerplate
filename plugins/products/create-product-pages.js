const { resolve } = require(`path`)

const component = resolve(`src/templates/product.js`)

module.exports = async function createProductPages(createPage, graphql){
	const result = await graphql(`{
		allContentfulProduct{
			edges {
				node {
					productId
					fields{
						path
					}
				}
			}
		}
	}`)

	if (result.errors) {
		console.error(result.errors)
		process.exit(1)
	}

	// Get product data
	result.data.allContentfulProduct.edges.forEach(({
		node: {
			productId,
			fields: {
				path,
			},
		},
	}) => {
		createPage({
			path,
			component,
			context: {
				id: productId,
			},
		})
	})
}