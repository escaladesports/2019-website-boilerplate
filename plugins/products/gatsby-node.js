const { resolve, parse } = require(`path`)
const createProductPages = require(`./create-product-pages`)

const productPath = resolve(`src/markdown/products`)
const categoryPath = resolve(`src/markdown/categories`)

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions

	await createProductPages(createPage, graphql)
}

exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions
	const { fileAbsolutePath } = node
	if (fileAbsolutePath) {
		if(fileAbsolutePath.indexOf(productPath) === 0){
			let slug = parse(fileAbsolutePath).name
			createNodeField({
				node,
				name: `path`,
				value: `/product/${slug}`,
			})
		}
		else if(fileAbsolutePath.indexOf(categoryPath) === 0){
			let slug = parse(fileAbsolutePath).name
			createNodeField({
				node,
				name: `path`,
				value: `/category/${slug}`,
			})
			createNodeField({
				node,
				name: `category`,
				value: slug,
			})
		}
	}
}