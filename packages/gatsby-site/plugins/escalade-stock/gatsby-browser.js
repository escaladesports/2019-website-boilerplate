import { setGlobal } from 'reactn'
import fetch from './browser-fetch'

const pollInterval = 10 * 60 * 1000	// Minutes

async function fetchInventory(options){
	try {
		const inventory = await fetch(options)
		setGlobal({ inventory })
	}
	catch(err){
		console.error(err)
	}
	setTimeout(() => fetchInventory(options), pollInterval)
}

export function onInitialClientRender(_, options){
	fetchInventory(options)
}
