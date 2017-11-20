'use strict'
const fetch = require('isomorphic-fetch')
const env = require('../../json/env.json')
const ids = require('../../json/product-ids.json')

let api
if (env.STOCK_API) {
	api = env.STOCK_API
}
else if (env.NODE_ENV === 'production') {
	api = 'https://xinn7f22bj.execute-api.us-east-1.amazonaws.com/production/handler'
}
else {
	api = 'https://t9w63tqdfk.execute-api.us-east-1.amazonaws.com/staging/handler'
}

module.exports = () => {
	return new Promise((resolve, reject) => {
		fetch(api, {
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