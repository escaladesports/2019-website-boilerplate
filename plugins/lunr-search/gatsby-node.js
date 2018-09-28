const crypto = require(`crypto`)
const striptags = require(`striptags`)
const lunr = require(`lunr`)

exports.createPages = async ({ actions, graphql }) => {
	const { createNode } = actions

	// Query data to be indexed
	const res = await graphql(`{
		posts: allMarkdownRemark(
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
					html
					frontmatter {
						title
					}
				}
			}
		}
	}`)

	const posts = res.data.posts.edges.map(({
		node: {
			id,
			html,
			frontmatter: {
				title,
			},
		},
	}) => {
		return {
			id,
			body: striptags(html),
			title,
		}
	})


	// Create index
	const lunrIndex = lunr(function(){
		this.ref(`id`)
		this.field(`title`)
		this.field(`body`)
		this.field(`excerpt`)
		this.field(`path`)

		posts.forEach(post => {
			this.add({
				id: post.id,
				...post,
			})
		})
	})
	const index = JSON.stringify(lunrIndex)


	createNode({
		index,
		id: `index`,
		children: [],
		internal: {
			type: `LunrSearchIndex`,
			contentDigest: crypto
				.createHash(`md5`)
				.update(JSON.stringify({ index }))
				.digest(`hex`),
		},
	})

}