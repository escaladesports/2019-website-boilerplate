const fetch = require(`./fetch`)

exports.sourceNodes = async function({ actions, createNodeId, createContentDigest }, options){
	const { createNode } = actions
	const inventory = await fetch(options)

	for (let id in inventory){
		const nodeContent = {
			...inventory[id],
			productId: id,
			lowerId: id.toLowerCase(),
			upperId: id.toUpperCase(),
		}
		const nodeMeta = {
			id: createNodeId(`escalade-inventory-${id}`),
			parent: null,
			children: [],
			internal: {
				type: `EscaladeInventory`,
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