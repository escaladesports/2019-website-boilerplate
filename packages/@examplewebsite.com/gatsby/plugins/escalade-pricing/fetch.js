const fetch = require(`isomorphic-fetch`)

const endpoints = {
	production: `https://pricing.escsportsapi.com/load`,
	testing: `https://pricing-test.escsportsapi.com/load`,
}

module.exports = async function({
	ids,
	siteId,
	env = `production`,
}){
	const res = await fetch(endpoints[env] || endpoints.production, {
		headers: {
			'ESC-API-Context': siteId,
			'ESC-API-Key': process.env.ESCA_API_KEY,
			'X-API-Key': process.env.X_API_KEY,
		},
		method: `POST`,
		body: JSON.stringify({
			skus: ids,
		}),
	})
	const { prices } = await res.json()
	return prices
}