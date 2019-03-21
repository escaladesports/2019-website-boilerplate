const { printType } = require(`graphql`)
const fs = require(`fs-extra`)
const path = require(`path`)

// Path to snapshot relative of schema-snapshot plugin directory
const schemaFilePath = path.join(process.cwd(), `./src/schema.gql`)

exports.sourceNodes = async ({ actions }) => {
	const { createTypes } = actions

	// Use snapshot to create types if exists
	if (await fs.exists(schemaFilePath)) {
		console.log(`\nLoading GraphQL schema...\n`)
		const typeDefs = (await fs.readFile(schemaFilePath)).toString()
		createTypes(typeDefs)
	}
}

exports.onPostBootstrap = async ({ store }, { include }) => {
	const { schema } = store.getState()

	// Create snapshot if it doesn't exist
	if (!await fs.exists(schemaFilePath)) {
		console.log(`\nCreating GraphQL schema...\n`)
		const typeDefs = include
			.map(type => printType(schema.getType(type)))
			.join(`\n\n`)
		await fs.outputFile(schemaFilePath, typeDefs + `\n`)
	}
}