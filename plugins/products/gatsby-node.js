const createProductPages = require(`./create-product-pages`)
const createCategoryPages = require(`./create-category-pages`)

const categoryNodes = {}
const productNodes = {}

function createPaths(createNodeField){
	for (let i in productNodes){
		const node = productNodes[i]
		const { slug } = node
		const category = categoryNodes[node.category___NODE]
		if (category){
			createNodeField({
				node,
				name: `path`,
				value: `/${category.slug}/${slug}`,
			})
		}
	}
}

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions
	await createProductPages(createPage, graphql)
	await createCategoryPages(createPage, graphql)
}

exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions
	const {
		id,
		internal: {
			type,
		},
	} = node
	if(type === `ContentfulProduct`){
		productNodes[id] = node
		createPaths(createNodeField)
	}
	if(type === `ContentfulCategory`){
		categoryNodes[id] = node
		createPaths(createNodeField)
	}
}