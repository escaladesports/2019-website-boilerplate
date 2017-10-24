'use strict'
const fetch = require('isomorphic-fetch')
const env = require('../../json/env.json')
const ids = require('../../json/product-ids.json')

module.exports = () => {
	return fetch(`https://cojn6cbcd7.execute-api.us-east-1.amazonaws.com/production/handler`, {
			method: 'POST',
			body: JSON.stringify({
				site: env.ECOMMERCE_API_SITE || 'all',
				ids: ids
			})
		})
		.then(res => res.json())
}