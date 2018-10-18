const { resolve } = require(`path`)

const component = resolve(`src/templates/category.js`)

module.exports = async function createProductPages(createPage, graphql){

	// Query category markdown data
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
					fields{
						path
						category
					}
					frontmatter{
						id
					}
				}
			}
		}
	}`)

	if (result.errors) {
		console.error(result.errors)
		process.exit(1)
	}

	const { edges } = result.data.allMarkdownRemark

	for(let i = 0; i < edges.length; i++){
		const {
			node: {
				fields: {
					path,
					category,
				},
				frontmatter: {
					id: categoryId,
				},
			},
		} = edges[i]

		// Query product markdown data
		const result = await graphql(`{
			allMarkdownRemark(
				filter: {
					fileAbsolutePath: {
						regex: "/src/markdown/products/"
					}
					frontmatter: {
						published: { eq: true }
						category: { eq: "${categoryId}" }
					}
				}
			){
				edges{
					node{
						frontmatter{
							id
						}
					}
				}
			}
		}`)

		if (result.errors) {
			console.error(result.errors)
			process.exit(1)
		}

		const productIds = result.data.allMarkdownRemark.edges.map(({
			node: {
				frontmatter: {
					id,
				},
			},
		}) => id)

		// Get all product IDs
		createPage({
			path,
			component,
			context: {
				category,
				productIds: `/${productIds.join(`|`)}/`,
			},
		})
	}

}