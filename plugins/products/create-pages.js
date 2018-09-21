const { resolve } = require(`path`)

module.exports = async ({ actions, graphql }) => {
	const { createPage } = actions

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

	const categories = {}
	const products = []

	// Get product data
	result.data.allProductMarkdown.edges.forEach(({ node }) => {
		const id = node.productId
		const category = node.category

		if (id) {
			const lowerId = id.toLowerCase()
			const upperId = id.toUpperCase()

			if (!categories[category]) {
				categories[category] = []
			}
			categories[category].push(upperId)

			products.push({
				id,
				lowerId,
				upperId,
				category,
			})

		}

	})

	console.log(products)

	// Create product pages
	products.forEach(product => {
		console.log(product)
		createPage({
			path: `/product/${product.lowerId}`,
			component: resolve(`./src/templates/product.js`),
			context: {
				id: product.id,
			},
		})
	})

	// Create category pages
	// for (let category in categories) {
	// 	createPage({
	// 		path: `/category/` + category,
	// 		component: resolve(`./src/templates/category.js`),
	// 		context: {
	// 			category: category,
	// 		},
	// 	})
	// }
}