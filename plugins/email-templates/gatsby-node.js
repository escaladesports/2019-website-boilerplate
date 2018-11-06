// const { resolve } = require(`path`)
const postProcess = require(`./post-process`)
// const cwd = process.cwd()

// exports.createPages = async ({ actions, graphql }, {
// 	publicPath = `email-templates`,
// 	markdownPath = `src/markdown/email`,
// }) => {
// 	const { createPage } = actions

// 	const res = await graphql(`{
// 		allMarkdownRemark(
// 			filter: {
// 				fileAbsolutePath: {
// 					regex: "/${markdownPath}/"
// 				}
// 			}
// 		){
// 			edges{
// 				node{
// 					fileAbsolutePath
// 					frontmatter{
// 						template
// 					}
// 				}
// 			}
// 		}
// 	}`)

// 	const nodes = res.data.allMarkdownRemark.edges.map(edge => edge.node)

// 	nodes.forEach(({ fileAbsolutePath, frontmatter }) => {
// 		const { template } = frontmatter
// 		if (!template) return
// 		let path = fileAbsolutePath
// 			.replace(cwd, ``)
// 			.replace(`/${markdownPath}/`, ``)
// 			.split(`.`)
// 			.slice(0, -1)
// 			.join(`.`)
// 		const component = resolve(`src/templates/${template}.js`)
// 		if (publicPath) {
// 			path = `${publicPath}/${path}`
// 		}

// 		createPage({
// 			path,
// 			component,
// 			context: {
// 				fileAbsolutePath,
// 			},
// 		})

// 	})

// }

exports.onPostBuild = async (_, {
	publicPath = `email-templates`,
	siteUrl = process.env.URL,
}) => {
	await postProcess(publicPath, siteUrl)
}