const fetch = require(`isomorphic-fetch`)

exports.sourceNodes = async (
	{
		actions,
		createNodeId,
		createContentDigest,
	}, {
		ids,
		siteId,
		env = `production`,
	}
) => {
	const { createNode } = actions
	const res = await fetch(endpoints[env] || endpoints.production, {
		headers: {
			'ESC-API-Context': siteId,
		},
		method: `POST`,
		body: JSON.stringify({
			skus: ids,
		}),
	})
	const { prices } = await res.json()

	for (let id in prices){
		prices[id].price = Number(prices[id].price)
		if(isNaN(prices[id].price)){
			prices[id].price = 0
		}
		const nodeContent = Object.assign({}, prices[id], {
			productId: id,
			lowerId: id.toLowerCase(),
			upperId: id.toUpperCase(),
		})
		const nodeMeta = {
			id: createNodeId(`escalade-pricing-${id}`),
			parent: null,
			children: [],
			internal: {
				type: `EscaladePricing`,
				mediatype: `text/html`,
				content: JSON.stringify(nodeContent),
				contentDigest: createContentDigest(nodeContent),
			},
		}
		const node = Object.assign({}, nodeContent, nodeMeta)
		createNode(node)
	}

}

const endpoints = {
	production: `https://pricing.escsportsapi.com/load`,
	testing: `https://pricing-test.escsportsapi.com/load`,
}