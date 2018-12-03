const { resolve } = require(`path`)

const component = resolve(`src/templates/product.js`)

module.exports = async function createProductPages(createPage, graphql){
	const result = await graphql(`{
		allContentfulProduct{
			edges {
				node {
					productId
					slug
					category{
						slug
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
			slug,
			category,
		},
	}) => {
		createPage({
			path: `/${category.slug}/${slug}`,
			component,
			context: {
				id: productId,
			},
		})
	})
}