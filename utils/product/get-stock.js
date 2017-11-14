'use strict'
const fetch = require('isomorphic-fetch')
const env = require('../../json/env.json')
const ids = require('../../json/product-ids.json')

module.exports = () => {
	if (env.STOCK_API) {
		return new Promise((resolve, reject) => {
			fetch(env.STOCK_API, {
					method: 'POST',
					body: JSON.stringify({
						site: env.ECOMMERCE_API_SITE || 'all',
						ids: ids
					})
				})
				.then(res => res.json())
				.then(populateDebug)
				.then(resolve)
				.catch(err => {
					console.error(err)
					resolve(populateMissing({}))
				})
		})
	}
	console.log('Warning: STOCK_API variable not found in environment')
	let obj = {}
	ids.map(id => {
		obj[id] = 0
	})
	return Promise.resolve(obj)
		.then(populateDebug)
}

function populateMissing(obj){
	ids.forEach(id => {
		if(!(id in obj)){
			obj[id] = 0
		}
	})
	return obj
}

function populateDebug(obj) {
	if (!env.DEBUG_ECOMMERCE) return obj
	for (let i in obj) {
		if (!obj[i]) {
			obj[i] = 1
		}
	}
	return obj
}