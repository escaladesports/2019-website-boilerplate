import { printType } from 'graphql'
import fs from 'fs-extra'
import path from 'path'

// Path to snapshot relative of schema-snapshot plugin directory
const schemaFilePath = path.join(process.cwd(), `./src/schema.gql`)

export async function sourceNodes({ actions }){
	const { createTypes } = actions

	// Use snapshot to create types if exists
	if (await fs.exists(schemaFilePath)) {
		console.log(`\nLoading GraphQL schema...\n`)
		const typeDefs = (await fs.readFile(schemaFilePath)).toString()
		createTypes(typeDefs)
	}
}

export async function onPostBootstrap({ store }, { include }){
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