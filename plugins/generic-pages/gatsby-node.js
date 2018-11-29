const { resolve } = require(`path`)

const postTemplate = resolve(`src/templates/generic.js`)

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions

	const res = await graphql(`{
		allContentfulPage{
			edges {
				node {
					id
					slug
				}
			}
		}
	}`)

	if(res.errors){
		console.error(res.errors)
		process.exit(1)
	}

	res.data.allContentfulPage.edges.forEach(({
		node: {
			id,
			slug,
		},
	}) => {

		createPage({
			path: slug,
			component: postTemplate,
			context: {
				id,
			},
		})
	})
}