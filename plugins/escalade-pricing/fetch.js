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
	const { prices } = await res.json()
	return prices
}

const endpoints = {
	production: `https://pricing.escsportsapi.com/load`,
	testing: `https://pricing-test.escsportsapi.com/load`,
}