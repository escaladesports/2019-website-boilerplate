const fetch = require(`isomorphic-fetch`)

module.exports = async ({
	ids,
	siteId,
	env = `production`,
}) => {
	const res = await fetch(endpoints[env] || endpoints.production, {
		method: `POST`,
		body: JSON.stringify({
			skus: ids,
			site: siteId,
			url: `https://inventory.escsportsapi.com/load`,
		}),
	})
	const { prices } = await res.json()
	return prices
}

const endpoints = {
	production: `https://m570gzyn6h.execute-api.us-east-1.amazonaws.com/production/`,
	testing: `https://7el25d5l16.execute-api.us-east-1.amazonaws.com/dev/`,
}