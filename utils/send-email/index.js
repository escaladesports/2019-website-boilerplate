const contentful = require(`contentful`)
const { outputJson } = require(`fs-extra`)
const { Converter } = require(`showdown`)
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
		content_type: `settings`,
	})
	const settings = res.items[0].fields
	await outputJson(`.cache/contentful-site-settings.json`, settings)
	console.log(`Output Contentful site settings`)
}

async function productIds(){
	console.log(`Getting Contentful product IDs...`)
	const res = await client.getEntries({
		content_type: `product`,
	})
	const productIds = res.items.map(item => item.fields.productId)
	await outputJson(`.cache/contentful-product-ids.json`, productIds)
	console.log(`Output Contentful product IDs`)
}

async function emailTemplates(){
	console.log(`Getting Contentful email templates...`)
	const res = await client.getEntries({
		content_type: `email`,
	})
	await Promise.all(res.items.map(({ fields }) => {
		fields.body = (new Converter()).makeHtml(fields.body)
		return outputJson(`.cache/contentful-${fields.slug}-email.json`, fields)
	}))
	console.log(`Output Contentful email templates`)
}

async function runAll(){
	try {
		await siteSettings()
		await productIds()
		await emailTemplates()
	}
	catch(err){
		console.error(err)
		process.exit(1)
	}
}

runAll()