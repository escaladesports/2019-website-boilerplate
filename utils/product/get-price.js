'use strict'
const fetch = require('isomorphic-fetch')
const ids = require('../../json/product-ids.json')

let api
if (process.env.PRICING_API){
	api = process.env.PRICING_API
}
else if (process.env.NODE_ENV === 'production'){
	api = 'https://cojn6cbcd7.execute-api.us-east-1.amazonaws.com/production/handler'
}
else{
	api = 'https://hmfnvefe14.execute-api.us-east-1.amazonaws.com/staging/handler'
}

module.exports = () => {
	return fetch(api, {
			method: 'POST',
			body: JSON.stringify({
				site: process.env.ECOMMERCE_API_SITE || 'all',
				ids: ids
			})
		})
		.then(res => res.json())
		.then(populateDebug)
}

function populateDebug(obj){
	if (!process.env.DEBUG_ECOMMERCE) return obj
	for(let i in obj){
		if(!obj[i]){
			obj[i] = 8.26
		}
	}
	return obj
}