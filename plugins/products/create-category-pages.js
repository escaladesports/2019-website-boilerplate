const { resolve } = require(`path`)

const component = resolve(`src/templates/category.js`)

module.exports = async function createProductPages(createPage, graphql){

	// Query category markdown data
	const result = await graphql(`{
		allContentfulCategory{
			edges {
				node {
					slug
					product{
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


	result.data.allContentfulCategory.edges.forEach(({
		node: {
			slug,
			product,
		},
	}) => {

		const productIds = product.map(({ productId }) => productId)

		createPage({
			path: `/${slug}`,
			component,
			context: {
				slug,
				productIds: `/${productIds.join(`|`)}/`,
			},
		})
	})

}