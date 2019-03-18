const { printType } = require(`graphql`)
const fs = require(`fs-extra`)
const path = require(`path`)

// Nodes to be included in snapshot
const types = [`MarkdownRemarkFrontmatter`]

// Path to snapshot relative of schema-snapshot plugin directory
const schemaFilePath = path.join(__dirname, `./schema.gql`)

exports.sourceNodes = async ({ actions }) => {
	const { createTypes } = actions

	// Use snapshot to create types if exists
	if (await fs.exists(schemaFilePath)) {
		const typeDefs = (await fs.readFile(schemaFilePath)).toString()
		createTypes(typeDefs)
	}
}

exports.onPostBootstrap = async ({ store }) => {
	const { schema } = store.getState()

	// Create snapshot if it doesn't exist
	if (!await fs.exists(schemaFilePath)) {
		const typeDefs = types
			.map(type => printType(schema.getType(type)))
			.join(`\n\n`)
		await fs.outputFile(schemaFilePath, typeDefs + `\n`)
	}
}