const createProductPages = require(`./create-product-pages`)
const createCategoryPages = require(`./create-category-pages`)

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions
	await createProductPages(createPage, graphql)
	await createCategoryPages(createPage, graphql)
}