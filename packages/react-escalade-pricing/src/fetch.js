import fetch from 'isomorphic-fetch'

const pollInterval = 1 * 60 * 1000	// Minutes
const endpoints = {
	production: `/api/pricing/load`,
	testing: `/test/api/pricing/load`,
}

export default async function fetchPrices(ids, setPrices, endpoint) {
	try {
		const res = await fetch(endpoint || endpoints.production, {
			method: `POST`,
			body: JSON.stringify({
				skus: ids,
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