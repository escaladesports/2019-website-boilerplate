'use strict'
const env = require('../../json/env.json')
const lowerIds = require('../../json/product-ids.json')

module.exports = (ids) => {
	return fetch(`https://cojn6cbcd7.execute-api.us-east-1.amazonaws.com/production/handler`, {
			method: 'POST',
			body: JSON.stringify({
				site: env.ECOMMERCE_API_SITE || 'all',
				ids: lowerIds
			})
		})
		.then(res => res.json())
}