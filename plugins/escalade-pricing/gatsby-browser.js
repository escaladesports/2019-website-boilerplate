import { setGlobal } from 'reactn'
import fetch from './fetch'

const pollInterval = 10 * 60 * 1000	// Minutes

async function fetchPrices(options){
	try {
		const prices = await fetch(options)
		setGlobal({ prices })
	}
	catch(err){
		console.error(err)
	}
	setTimeout(() => fetchPrices(options), pollInterval)
}

export function onInitialClientRender(_, options){
	fetchPrices(options)
}
