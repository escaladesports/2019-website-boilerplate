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
	const headers = {
		'ESC-API-Context': siteId,
		'ESC-API-Key': process.env.ESCA_API_KEY,
		'X-API-Key': process.env.X_API_KEY,
	}
	const res = await fetch(endpoints[env] || endpoints.production, {
		headers,
		method: `POST`,
		body: JSON.stringify({
			skus: ids,
		}),
	})
	const text = await res.text()
	const { inventory } = JSON.parse(text)
	return inventory
}