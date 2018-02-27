require('dotenv').config({ silent: true })
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

function templatePath(id){
	return path.resolve(`./src/templates/${id}.js`)
}

// Create dynamic page test
exports.createPages = ({ boundActionCreators, graphql }) => {
	const { createPage, createRedirect } = boundActionCreators

	// Home page
	createPage({
		path: '/',
		component: path.resolve('src/pages/index.js')
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
									}
									frontmatter{
										category
									}
								}
							}
						}
					}
				`).then(result => {
					if (result.errors) {
						reject(result.errors)
					}

					const categories = []

					// Create markdown pages
					result.data.allMarkdownRemark.edges.forEach(edge => {
						const fields = edge.node.fields
						const filePath = path.dirname(edge.node.fileAbsolutePath)
						let template = fields.template
						const ctx = {
							slug: fields.slug
						}

						if (isPath('pages', filePath)) {
							ctx.type = 'page'
							ctx.slug = ctx.slug.replace('/pages', '')
							if (!template) template = 'page'
						}
						else if (isPath('products', filePath)){
							ctx.type = 'product'
							ctx.id = fields.id
							ctx.lowerId = fields.id.toLowerCase()
							ctx.upperId = fields.id.toUpperCase()
							ctx.slug = `/product/${ctx.lowerId}`
							if(!template) template = 'product'

							// Create category
							const category = edge.node.frontmatter.category
							if (categories.indexOf(category) === -1) {
								categories.push(category)
								const slug = `/category/${category}`
								const pageObj = {
									path: slug,
									component: path.resolve(`./src/templates/category.js`),
									context: {
										type: `category`,
										id: category,
										slug: slug
									},
								}
								createPage(pageObj)
							}
						}
						if (ctx.type) {
							const pageObj = {
								path: ctx.slug,
								component: path.resolve(`./src/templates/${template || 'default'}.js`),
								context: ctx,
							}

							createPage(pageObj)
						}
					})
				})
			)
		}),


	]

	return Promise.all(promises)
		.catch(err => {
			console.log(err)
			process.exit(1)
		})

}

function isPath(dir, path){
	let checkPath = `${__dirname}/src/markdown/${dir}`
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
		let slug
		if(node.frontmatter && node.frontmatter.slug){
			slug = node.frontmatter.slug
		}
		else {
			slug = createFilePath({ node, getNode })
		}
		slug = slug.split('/')
		slug = slug.filter(val => val)
		if(slug[0] === 'pages') slug.shift()
		slug = slug.join('/')
		slug = '/' + slug
		createNodeField({
			name: 'slug',
			node,
			value: slug,
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
