import fetch from 'isomorphic-fetch'

const pollInterval = 1 * 60 * 1000	// Minutes

export default async function fetchInventory(ids, setInventory, endpoint) {
	try {
		const res = await fetch(endpoint || `/api/inventory/load`, {
			method: `POST`,
			body: JSON.stringify({
				skus: ids,
			}),
		})
		const { inventory } = await res.json()
		if(!inventory) setInventory({})
		for(let i = ids.length; i--;){
			const id = ids[i]
			if(!inventory[id.toUpperCase()]){
				inventory[id.toUpperCase()] = { stock: 0 }
			}
		}
		setInventory(inventory)
	}
	catch (err) {
		console.error(err)
	}
	setTimeout(() => fetchInventory(ids, setInventory, endpoint), pollInterval)
}