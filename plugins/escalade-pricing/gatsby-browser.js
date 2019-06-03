import pricesState from './state'
import fetch from './fetch'

const pollInterval = 10 * 60 * 1000	// Minutes

async function fetchPrices(options){
	try {
		const prices = await fetch(options)
		pricesState.setState(prices)
	}
	catch(err){
		console.error(err)
	}
	setTimeout(() => fetchPrices(options), pollInterval)
}

export function onInitialClientRender(_, options){
	fetchPrices(options)
}
