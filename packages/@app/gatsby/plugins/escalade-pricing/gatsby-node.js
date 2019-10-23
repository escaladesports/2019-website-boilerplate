const fetch = require(`./fetch`)

exports.sourceNodes = async function({
	actions,
	createNodeId,
	createContentDigest,
}, options){
	const { createNode } = actions

	const prices = await fetch(options)

	for (let id in prices){
		const nodeContent = {
			...prices[id],
			productId: id,
			lowerId: id.toLowerCase(),
			upperId: id.toUpperCase(),
		}
		const nodeMeta = {
			id: createNodeId(`escalade-pricing-${id}`),
			parent: null,
			children: [],
			internal: {
				type: `EscaladePricing`,
				content: JSON.stringify(nodeContent),
				contentDigest: createContentDigest(nodeContent),
			},
		}
		const node = {
			...nodeContent,
			...nodeMeta,
		}
		createNode(node)
	}
}