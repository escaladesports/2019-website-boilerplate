const { resolve, parse } = require(`path`)
const { postsPerPage } = require(`../../site-config`)

const markdownPath = resolve(`src/markdown/blog`)
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
				frontmatter: {
					published: { eq: true }
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
						date
					}
					fields{
						path
						published
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
	const now = new Date()
	for(let i = posts.length; i--;){
		if(now < new Date(posts[i].frontmatter.date)){
			posts.splice(i, 1)
		}
	}

	const allTags = {}

	posts.forEach(({ id, frontmatter, fields }, index) => {
		const { tags } = frontmatter
		const { path, published } = fields
		let previous = posts[index + 1]
		let next = posts[index - 1]

		if(!published) return

		// Create single post page
		createPage({
			path,
			component: postTemplate,
			context: {
				id,
				previousId: previous ? previous.id : id,
				nextId: next ? next.id : id,
			},
		})

		tags.forEach(tag => {
			if(!allTags[tag]){
				allTags[tag] = 0
			}
			allTags[tag]++
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
	for (let tag in allTags) {
		const totalPages = Math.ceil(allTags[tag] / postsPerPage)
		for (let i = totalPages; i--;) {
			const page = i + 1
			let path = i === 0 ? `/blog/tags/${tag}` : `/blog/tags/${tag}/${page}`
			createPage({
				path,
				component: tagsTemplate,
				context: {
					tag,
					skip: i * postsPerPage,
					limit: postsPerPage,
					page,
					totalPages,
				},
			})
		}
	}
}

// Create URL paths for posts
exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions
	const { fileAbsolutePath } = node
	if (fileAbsolutePath && fileAbsolutePath.indexOf(markdownPath) === 0) {
		const { path, published, date } = node.frontmatter
		let slug = path || parse(fileAbsolutePath).name
		if (!isNaN(slug)){
			slug = `post-${slug}`
		}
		createNodeField({
			node,
			name: `path`,
			value: `/blog/${slug}`,
		})
		createNodeField({
			node,
			name: `published`,
			value: (published === true && new Date() > new Date(date)) ? true : false,
		})
	}
}