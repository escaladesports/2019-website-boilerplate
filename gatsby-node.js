require('dotenv').config({ silent: true })
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

function templatePath(id){
	return `./src/templates/${id}.js`
}

// Removes trailing slash
exports.onCreatePage = ({ page, boundActionCreators }) => {
	const { createPage, deletePage } = boundActionCreators
	return new Promise((resolve, reject) => {
		const newPage = Object.assign({}, page, {
			path: page.path === `/` ? page.path : page.path.replace(/\/$/, ``),
		})
		if (newPage.path !== page.path) {
			deletePage(page)
			createPage(newPage)
		}
		resolve()
	})
}

// Create dynamic page test
exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage } = boundActionCreators

	// Home page
	createPage({
		path: '/',
		component: path.resolve('src/pages/index.js'),
		context: {
			productId: 7
		}
	})


	const promises = [

		// Markdown pages
		new Promise((resolve, reject) => {
			resolve(
				graphql(`
					{
						allMarkdownRemark{
							edges {
								node {
									fileAbsolutePath
									fields {
										slug
										id
										template
									}
								}
							}
						}
					}
				`).then(result => {
					if (result.errors) {
						console.log(result.errors)
						reject(result.errors)
					}

					console.log(JSON.stringify(result.data.allMarkdownRemark.edges, null, 3))

					// Create markdown pages
					result.data.allMarkdownRemark.edges.forEach(edge => {
						const fields = edge.node.fields
						const filePath = path.dirname(edge.node.fileAbsolutePath)
						let slug = fields.slug
						let template = fields.template || 'default'


						if (isPath('pages', filePath)){
							if(!template) template = 'page'
						}
						else if (isPath('products', filePath)){
							slug = `/product/${fields.id.toLowerCase()}/`
							if(!template) template = 'product'
						}

						console.log('__dirname: ', __dirname)
						console.log('filePath: ', filePath)
						console.log('slug: ', slug)

						createPage({
							path: slug,
							component: `./src/templates/${template}.js`,
							context: {
								slug: slug,
							},
						})
					})
				})
			)
		}),



	]

	return Promise.all(promises)

}

function isPath(dir, path){
	const checkPath = `${__dirname}/src/${dir}`
	console.log('Checking path: ', checkPath)
	return path.indexOf(checkPath) === 0
}


const requiredFields = {
	id: '',
	template: '',
}
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
	const { createNodeField } = boundActionCreators


	if (node.internal.type === `MarkdownRemark`) {

		// Create slug
		createNodeField({
			name: 'slug',
			node,
			value: createFilePath({ node, getNode }),
		})

		// Create template
		for(let i in requiredFields){
			createNodeField({
				name: i,
				node,
				value: node.frontmatter[i] || requiredFields[i]
			})
		}


	}
}
