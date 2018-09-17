const { resolve } = require(`path`)

const tagsTemplate = resolve(`src/templates/tags.js`)
const postTemplate = resolve(`src/templates/post.js`)

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions

	const res = await graphql(`{
		allMarkdownRemark(
			filter: {
				fileAbsolutePath: {
					regex: "/src/markdown/blog/"
				}
			}
			sort: { order: DESC, fields: [frontmatter___date] }
		) {
			edges {
				node {
					id
					frontmatter {
						path
						tags
					}
				}
			}
		}
	}`)

	if(res.errors){
		console.error(res.errors)
		process.exit(1)
	}

	const posts = res.data.allMarkdownRemark.edges.map(edge => edge.node)

	const foundTags = []
	posts.forEach(({ id, frontmatter }, index) => {
		const { tags, path } = frontmatter
		let previous = posts[index + 1]
		let next = posts[index - 1]

		createPage({
			path: `/blog/${path}`,
			component: postTemplate,
			context: {
				id,
				previousId: previous ? previous.id : id,
				nextId: next ? next.id : id,
			},
		})

		tags.forEach(tag => {
			if (foundTags.indexOf(tag) === -1) {
				foundTags.push(tag)

				// Create tag page
				createPage({
					path: `/blog/tags/${tag}`,
					component: tagsTemplate,
					context: { tag },
				})

			}
		})
	})
}