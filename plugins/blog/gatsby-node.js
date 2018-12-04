const { resolve, parse } = require(`path`)

const markdownPath = resolve(`src/markdown/blog`)
const blogTemplate = resolve(`src/templates/blog.js`)
const tagsTemplate = resolve(`src/templates/tags.js`)
const postTemplate = resolve(`src/templates/post.js`)
const now = new Date()

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions

	const res = await graphql(`{
		allContentfulPost(
			sort: { order: DESC, fields: [date] }
		) {
			edges {
				node {
					id
					slug
					tags{
						slug
					}
				}
			}
		}

		config: markdownRemark(
			fileAbsolutePath: { regex: "/src/markdown/settings/site.md/" }
		){
			frontmatter{
				postsPerPage
			}
		}
	}`)

	if(res.errors){
		console.error(res.errors)
		process.exit(1)
	}

	const { postsPerPage } = res.data.config.frontmatter

	const posts = res.data.allContentfulPost.edges
	const allTags = {}

	posts.forEach(({
		node: {
			id,
			slug,
			tags,
		},
	}, index) => {
		let previous = posts[index + 1]
		let next = posts[index - 1]

		// Create single post page
		createPage({
			path: `/post/${slug}`,
			component: postTemplate,
			context: {
				id,
				previousId: previous ? previous.node.id : id,
				nextId: next ? next.node.id : id,
				slug,
			},
		})

		tags.forEach(({ slug }) => {
			if(!allTags[slug]){
				allTags[slug] = 0
			}
			allTags[slug]++
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
			name: `slug`,
			value: slug,
		})
		createNodeField({
			node,
			name: `path`,
			value: `/blog/${slug}`,
		})
		createNodeField({
			node,
			name: `published`,
			value: (published === true && now > new Date(date)) ? true : false,
		})
	}
}