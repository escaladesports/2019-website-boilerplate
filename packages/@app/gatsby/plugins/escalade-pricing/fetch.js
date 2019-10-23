const fetch = require(`isomorphic-fetch`)
const { formatPrice } = require(`utils/helpers/currency`)

const endpoints = {
	production: `https://pricing.escsportsapi.com/load`,
	testing: `https://pricing-test.escsportsapi.com/load`,
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
	const { prices } = await res.json()
	if(!prices) return {}
	for (let id in prices){
		prices[id].price = prices[id].price ? formatPrice(prices[id].price) : `0.00`
	}
	for(let i = ids.length; i--;){
		const id = ids[i]
		if(!prices[id.toUpperCase()]){
			prices[id.toUpperCase()] = { price: `0.00` }
		}
	}
	return prices
}