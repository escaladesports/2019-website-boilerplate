const { resolve, parse } = require(`path`)

const markdownPath = resolve(`src/markdown/pages`)
const postTemplate = resolve(`src/templates/generic.js`)

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions

	const res = await graphql(`{
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					regex: "/src/markdown/pages/"
				}
			}
		) {
			edges {
				node {
					id
					frontmatter {
						path
						title
					}
					fields{
						path
					}
				}
			}
		}
	}`)

	if (res.errors) {
		console.error(res.errors)
		process.exit(1)
	}

	const pages = res.data.allMarkdownRemark.edges.map(edge => edge.node)

	pages.forEach(({ id, fields }) => {
		const { path } = fields

		createPage({
			path,
			component: postTemplate,
			context: {
				id,
			},
		})

	})
}

// Create URL paths for posts
exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions
	const { fileAbsolutePath } = node
	if (fileAbsolutePath && fileAbsolutePath.indexOf(markdownPath) === 0) {
		let path = node.frontmatter.path || parse(fileAbsolutePath).name
		createNodeField({
			node,
			name: `path`,
			value: `/${path}`,
		})
	}
}