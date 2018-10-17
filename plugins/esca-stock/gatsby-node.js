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
	const { inventory } = await res.json()

	for (let id in inventory){
		const nodeContent = Object.assign({}, inventory[id], {
			productId: id,
			lowerId: id.toLowerCase(),
			upperId: id.toUpperCase(),
		})
		const nodeMeta = {
			id: createNodeId(`escalade-inventory-${id}`),
			parent: null,
			children: [],
			internal: {
				type: `EscaladeInventory`,
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
	production: `https://inventory.escsportsapi.com/load`,
	testing: `https://inventory-test.escsportsapi.com/load`,
}