const fetch = require(`isomorphic-fetch`)

module.exports = async ({
	ids,
	siteId,
	env = `production`,
}) => {
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

const endpoints = {
	production: `https://inventory.escsportsapi.com/load`,
	testing: `https://inventory-test.escsportsapi.com/load`,
}