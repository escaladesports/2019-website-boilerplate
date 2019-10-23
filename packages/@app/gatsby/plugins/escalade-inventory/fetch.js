const fetch = require(`isomorphic-fetch`)

const endpoints = {
	production: `https://inventory.escsportsapi.com/load`,
	testing: `https://inventory-test.escsportsapi.com/load`,
}

module.exports = async function({
	ids,
	siteId,
	env = `production`,
}){
	const isTesting = process.env.STAGE === `test`
	const xApiKey = isTesting
		? process.env.X_API_KEY_TEST
		: process.env.X_API_KEY
	const url = endpoints[isTesting ? `testing` : env] || endpoints.production
	const res = await fetch(url, {
		headers: {
			'ESC-API-Context': siteId,
			'X-API-Key': xApiKey,
		},
		method: `POST`,
		body: JSON.stringify({
			skus: ids,
		}),
	})
	const text = await res.text()
	const { inventory } = JSON.parse(text)
	if(!inventory) return {}
	for(let i = ids.length; i--;){
		const id = ids[i]
		if(!inventory[id.toUpperCase()]){
			inventory[id.toUpperCase()] = { stock: 0 }
		}
	}
	return inventory
}