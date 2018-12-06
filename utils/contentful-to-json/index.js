const contentful = require(`contentful`)
const { outputJson } = require(`fs-extra`)
const {
	CONTENTFUL_SPACE_ID,
	CONTENTFUL_READ_ACCESS_TOKEN,
} = require(`../../env`)
const client = contentful.createClient({
	space: CONTENTFUL_SPACE_ID,
	accessToken: CONTENTFUL_READ_ACCESS_TOKEN,
})

async function siteSettings(){
	console.log(`Getting Contentful site settings...`)
	const res = await client.getEntries({
		content_type: `siteSettings`,
	})
	const settings = res.items[0].fields
	await outputJson(`.cache/contentful-site-settings.json`, settings)
	console.log(`Output Contentful site settings`)
}

async function productIds(){
	console.log(`Getting Contentful product IDs...`)
	const res = await client.getEntries({
		'content_type': `product`,
	})
	const productIds = res.items.map(item => item.fields.productId)
	await outputJson(`.cache/contentful-product-ids.json`, productIds)
	console.log(`Output Contentful product IDs`)
}

async function runAll(){
	try {
		await siteSettings()
		await productIds()
	}
	catch(err){
		console.error(err)
		process.exit(1)
	}
}

runAll()