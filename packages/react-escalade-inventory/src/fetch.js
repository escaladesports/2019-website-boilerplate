import fetch from 'isomorphic-fetch'

const pollInterval = 1 * 60 * 1000	// Minutes
const endpoints = {
	production: `https://m570gzyn6h.execute-api.us-east-1.amazonaws.com/production/`,
	testing: `https://7el25d5l16.execute-api.us-east-1.amazonaws.com/dev/`,
}

export default async function fetchInventory(ids, setInventory) {
	try {
		const res = await fetch(endpoints.production, {
			method: `POST`,
			body: JSON.stringify({
				skus: ids,
				site: process.env.GATSBY_ESCA_API_SITE,
				url: `https://inventory.escsportsapi.com/load`,
			}),
		})
		const data = await res.json()
		console.log(`data`, data)
		const { inventory } = data
		setInventory(inventory)
	}
	catch (err) {
		console.error(err)
	}
	setTimeout(() => fetchInventory(ids, setInventory), pollInterval)
}