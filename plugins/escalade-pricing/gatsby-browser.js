const pricesState = require(`./state`)
const fetch = require(`./fetch`)

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

exports.onInitialClientRender = (_, options) => {
	fetchPrices(options)
}
