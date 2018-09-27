const { resolve } = require(`path`)

const component = resolve(`src/templates/category.js`)

module.exports = async function createProductPages(createPage, graphql){
	const result = await graphql(`{
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					regex: "/src/markdown/categories/"
				}
				frontmatter: {
					published: { eq: true }
				}
			}
		){
			edges {
				node {
					id
					fields{
						path
						category
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
	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		const { path, category } = node.fields
		createPage({
			path,
			component,
			context: {
				id: node.id,
				category,
			},
		})
	})
}