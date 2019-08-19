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
const productIdsPath = join(cwd, `.cache/product-ids.json`)
const siteSettingsPath = join(cwd, `.cache/site-settings.json`)

async function createProductJson(){
	const data = await client.fetch(`*[_type == "product"] {defaultProductVariant}`)
	const productIds = data.map(({ defaultProductVariant: { sku } }) => sku)
	await outputJson(productIdsPath, productIds)
}

async function createSiteSettings() {
	const [data] = await client.fetch(`*[_type == "siteSettings"] {title, description, keywords}`)
	await outputJson(siteSettingsPath, data)
}

try {
	createProductJson()
	createSiteSettings()
}
catch(err){
	console.error(err)
	process.exit(1)
}