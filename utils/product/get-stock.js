'use strict'
const fetch = require('isomorphic-fetch')
const env = require('../../json/env.json')
const ids = require('../../json/product-ids.json')

module.exports = () => {
	return fetch(env.STOCK_API, {
			method: 'POST',
			body: JSON.stringify({
				site: env.ECOMMERCE_API_SITE || 'all',
				ids: ids
			})
		})
		.then(res => res.json())
}
