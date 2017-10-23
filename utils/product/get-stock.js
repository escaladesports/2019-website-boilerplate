'use strict'
const fetch = require('isomorphic-fetch')
const lowerIds = require('../../json/product-ids.json')
const upperIds = lowerIds.map(id => id.toUpperCase())

module.exports = () => {
	return new Promise((resolve, reject) => {
		fetch('https://kgft20mm4l.execute-api.us-east-1.amazonaws.com/production/post', {
				method: 'POST',
				body: JSON.stringify({
					site: 'all',
					path: 'v1/salsify/search',
					sku: { value: upperIds },
					'inventory-only': 1
				})
			})
			.then(res => res.json())
			.then(res => {
				let obj = {}
				res.products.forEach((prod, key) => {
					if (typeof prod.stock === 'number' && prod.stock > 0) {
						obj[lowerIds[key]] = prod.stock
					}
					else {
						obj[lowerIds[key]] = 0
					}
				})
				return obj
			})
			.then(resolve)
			.catch(reject)
	})
}
