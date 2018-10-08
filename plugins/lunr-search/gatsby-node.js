const crypto = require(`crypto`)
const striptags = require(`striptags`)
const lunr = require(`lunr`)

exports.createPages = async ({ actions, graphql }) => {
	const { createNode } = actions

	// Query data to be indexed
	const res = await graphql(`{
		posts: allMarkdownRemark(
			filter: {
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
					excerpt
					frontmatter {
						title
					}
					fields{
						path
					}
				}
			}
		}
	}`)

	const posts = res.data.posts.edges.map(({
		node: {
			id,
			html,
			excerpt,
			frontmatter: {
				title,
			},
			fields: {
				path,
			},
		},
	}) => {
		return {
			id,
			index: {
				body: striptags(html),
				title,
			},
			store: {
				title,
				excerpt,
				path,
			},
		}
	})

	const itemStore = {}

	// Create index
	const lunrIndex = lunr(function(){
		this.ref(`id`)
		this.field(`title`)
		this.field(`body`)
		this.field(`excerpt`)
		this.field(`path`)

		posts.forEach(({ id, index, store }) => {
			this.add({
				id,
				...index,
			})
			itemStore[id] = store
		})
	})
	const index = JSON.stringify(lunrIndex)
	const store = JSON.stringify(itemStore)

	createNode({
		index,
		store,
		id: `index`,
		children: [],
		internal: {
			type: `LunrSearchIndex`,
			contentDigest: crypto
				.createHash(`md5`)
				.update(JSON.stringify({
					index,
					store,
				}))
				.digest(`hex`),
		},
	})

}