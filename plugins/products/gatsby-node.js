const { resolve, parse } = require(`path`)

const markdownPath = resolve(`src/markdown/products`)
const productTemplate = resolve(`src/templates/product.js`)
const categoryTemplate = resolve(`src/templates/category.js`)

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions

	const result = await graphql(`{
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					regex: "/src/markdown/products/"
				}
				frontmatter: {
					published: { eq: true }
				}
			}
		){
			edges {
				node {
					frontmatter{
						id
						category
					}
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

	const categories = {}

	// Get product data
	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		const { id, category } = node.frontmatter
		createPage({
			path: node.fields.path,
			component: productTemplate,
			context: {
				id,
			},
		})

		if(!categories[category] && category){
			categories[category] = true
			createPage({
				path: `/category/${category}`,
				component: categoryTemplate,
				context: {
					category,
				},
			})
		}
	})
}

exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions
	const { fileAbsolutePath } = node
	if (fileAbsolutePath && fileAbsolutePath.indexOf(markdownPath) === 0) {
		let slug = parse(fileAbsolutePath).name
		createNodeField({
			node,
			name: `path`,
			value: `/product/${slug}`,
		})
	}
}