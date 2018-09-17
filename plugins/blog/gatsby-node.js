const { resolve, parse } = require(`path`)
const { postsPerPage } = require(`../../site-config`)

const blogTemplate = resolve(`src/templates/blog.js`)
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
					fileAbsolutePath
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
	const allTags = []

	posts.forEach(({ id, fileAbsolutePath, frontmatter }, index) => {
		const { tags, path } = frontmatter
		let previous = posts[index + 1]
		let next = posts[index - 1]

		// Create single post page
		createPage({
			path: `/blog/post/${path || parse(fileAbsolutePath).name}`,
			component: postTemplate,
			context: {
				id,
				previousId: previous ? previous.id : id,
				nextId: next ? next.id : id,
			},
		})

		tags.forEach(tag => {
			if (allTags.indexOf(tag) === -1) {
				allTags.push(tag)
			}
		})
	})

	const totalPages = Math.ceil(posts.length / postsPerPage)
	for (let i = totalPages; i--;){
		const page = i + 1
		let path = i === 0 ? `/blog` : `/blog/${page}`
		createPage({
			path,
			component: blogTemplate,
			context: {
				skip: i * postsPerPage,
				limit: postsPerPage,
				page,
				totalPages,
			},
		})
	}

	// Create tags pages
	allTags.forEach(tag => {
		createPage({
			path: `/blog/tags/${tag}`,
			component: tagsTemplate,
			context: { tag },
		})
	})
}