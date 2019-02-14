const fetch = require(`./fetch`)

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, options) => {
	const { createNode } = actions

	const prices = await fetch(options)

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