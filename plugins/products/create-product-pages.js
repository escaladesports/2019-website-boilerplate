const { resolve } = require(`path`)

const component = resolve(`src/templates/product.js`)

module.exports = async function createProductPages(createPage, graphql){
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

	// Get product data
	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.fields.path,
			component,
			context: {
				id: node.frontmatter.id,
			},
		})
	})
}