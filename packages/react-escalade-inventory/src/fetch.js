import fetch from 'isomorphic-fetch'

const pollInterval = 1 * 60 * 1000	// Minutes
const endpoints = {
	production: `/api/inventory/load`,
	testing: `/test/api/inventory/load`,
}

export default async function fetchInventory(ids, setInventory, endpoint) {
	try {
		const res = await fetch(endpoint || endpoints.production, {
			method: `POST`,
			body: JSON.stringify({
				skus: ids,
			}),
		})
		const { inventory } = await res.json()
		console.log(inventory)
		setInventory(inventory)
	}
	catch (err) {
		console.error(err)
	}
	setTimeout(() => fetchInventory(ids, setInventory, endpoint), pollInterval)
}