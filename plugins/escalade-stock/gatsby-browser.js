const inventoryState = require(`./state`)
const fetch = require(`./fetch`)

const pollInterval = 10 * 60 * 1000	// Minutes

async function fetchInventory(options){
	try {
		const inventory = await fetch(options)
		inventoryState.setState(inventory)
	}
	catch(err){
		console.error(err)
	}
	setTimeout(() => fetchInventory(options), pollInterval)
}

exports.onInitialClientRender = (_, options) => {
	fetchInventory(options)
}
