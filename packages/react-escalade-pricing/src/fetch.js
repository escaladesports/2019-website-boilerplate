import fetch from 'isomorphic-fetch'
const { formatPrice } = require(`utils/helpers/currency`)

const pollInterval = 1 * 60 * 1000	// Minutes

export default async function fetchPrices(ids, setPrices, endpoint) {
	try {
		let res = await fetch(endpoint || `/api/pricing/load`, {
			method: `POST`,
			body: JSON.stringify({
				skus: ids,
			}),
		})
		res = await res.text()
		const { prices } = JSON.parse(res)
		if(!prices) setPrices({})
		for (let id in prices){
			prices[id].price = prices[id].price ? formatPrice(prices[id].price) : `0.00`
		}
		for(let i = ids.length; i--;){
			const id = ids[i]
			if(!prices[id.toUpperCase()]){
				prices[id.toUpperCase()] = { price: `0.00` }
			}
		}
		setPrices(prices)
	}
	catch (err) {
		console.error(err)
	}
	setTimeout(() => fetchPrices(ids, setPrices, endpoint), pollInterval)
}