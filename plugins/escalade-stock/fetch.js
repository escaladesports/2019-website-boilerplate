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
	const res = await fetch(endpoints[env] || endpoints.production, {
		headers: {
			'ESC-API-Context': siteId,
		},
		method: `POST`,
		body: JSON.stringify({
			skus: ids,
		}),
	})
	const { inventory } = await res.json()
	return inventory
}