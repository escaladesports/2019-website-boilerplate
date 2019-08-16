const { join } = require(`path`)
const sanityClient = require(`@sanity/client`)
const { outputJson } = require(`fs-extra`)
const { SANITY_TOKEN } = require(`utils/env`)
const { api: { projectId, dataset } } = require(`cms/sanity.json`)

const cwd = process.cwd()
const client = sanityClient({
	projectId,
	dataset,
	token: SANITY_TOKEN,
	useCdn: false,
})

!async function sanityToProductJson(){
	const data = await client.fetch(`*[_type == "product"] {defaultProductVariant}`)
	const productIds = data.map(({ defaultProductVariant: { sku } }) => sku)
	const path = join(cwd, `.cache/product-ids.json`)
	console.log(`Outputting product IDs to `, path)
	await outputJson(path, productIds)
}()