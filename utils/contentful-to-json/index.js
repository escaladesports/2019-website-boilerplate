require(`dotenv`).config({ silent: true })
const contentful = require(`contentful`)
const { outputJson } = require(`fs-extra`)

const client = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_READ_ACCESS_TOKEN,
})

async function go(){
	const res = await client.getEntries({
		'content_type': `product`,
	})
	const productIds = res.items.map(item => item.fields.productId)
	await outputJson(`.cache/product-ids.json`, productIds)
}

go()