require('dotenv').config({ silent: true })
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

function templatePath(id){
	return path.resolve(`./src/templates/${id}.js`)
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

					// Create markdown pages
					result.data.allMarkdownRemark.edges.forEach(edge => {
						const fields = edge.node.fields
						const filePath = path.dirname(edge.node.fileAbsolutePath)
						let template = fields.template
						const ctx = {
							slug: fields.slug
						}


						if (isPath('pages', filePath)){
							ctx.type = 'page'
							if(!template) template = 'page'
						}
						else if (isPath('products', filePath)){
							ctx.type = 'product'
							ctx.id = fields.id
							ctx.slug = `/product/${ctx.id.toLowerCase()}`
							if(!template) template = 'product'
						}

						const pageObj = {
							path: ctx.slug,
							component: path.resolve(`./src/templates/${template || 'default'}.js`),
							context: ctx,
						}

						createPage(pageObj)
					})
				})
			)
		}),



	]

	return Promise.all(promises)

}

function isPath(dir, path){
	const checkPath = `${__dirname}/src/${dir}`
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
		let filePath = createFilePath({ node, getNode })
		filePath.split('/')
		if(!filePath[filePath.length - 1]){
			filePath.pop()
		}
		createNodeField({
			name: 'slug',
			node,
			value: filePath,
		})

		// Create template
		for(let i in requiredFields){
			let val = node.frontmatter[i]
			createNodeField({
				name: i,
				node,
				value: val || requiredFields[i]
			})
		}



	}
}
