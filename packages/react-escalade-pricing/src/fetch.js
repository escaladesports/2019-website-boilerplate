import fetch from 'isomorphic-fetch'

const pollInterval = 1 * 60 * 1000	// Minutes
const endpoints = {
	production: `https://m570gzyn6h.execute-api.us-east-1.amazonaws.com/production/`,
	testing: `https://7el25d5l16.execute-api.us-east-1.amazonaws.com/dev/`,
}

export default async function fetchPrices(ids, setPrices) {
	try {
		const res = await fetch(endpoints.production, {
			method: `POST`,
			body: JSON.stringify({
				skus: ids,
				site: process.env.GATSBY_ESCA_API_SITE,
				url: `https://pricing.escsportsapi.com/load`,
			}),
		})
		const { prices } = await res.json()
		setPrices(prices)
	}
	catch (err) {
		console.error(err)
	}
	setTimeout(() => fetchPrices(ids, setPrices), pollInterval)
}