'use strict'
import fetchPrice from 'utils/product/get-price'
import env from 'json/env.json'

const pollingInterval = 10 * 60 * 1000
const events = []
let timeoutId

// Initiates price update interval
export function initPrice() {
	if (!window.initPriceInterval) {
		window.initPriceInterval = true
		if (env.ENABLE_ECOMMERCE) {
			updatePrice()
				.then(setPriceTimeout)
				.catch(err => {
					console.error(err)
					setPriceTimeout()
				})
		}
	}
}

// Updates global price
export function updatePrice() {
	return fetchPrice()
		.then(prices => {
			console.log(prices)
			window.productPrices = prices
			events.forEach(event => event(prices))
			setPriceTimeout()
			updateZygote(prices)
			return prices
		})
		.catch(err => {
			console.error(err)
			setPriceTimeout()
		})
}


export function addPriceEvent(fn) {
	if (env.ENABLE_ECOMMERCE) {
		events.push(fn)
	}
}

export function removePriceEvent(fn) {
	let i = events.indexOf(fn)
	if (i > -1) {
		events.splice(i, 1)
	}
}

function setPriceTimeout() {
	clearTimeout(timeoutId)
	timeoutId = setTimeout(updatePrice, pollingInterval)
}

function updateZygote(prices){
	if (window.zygote && Array.isArray(window.zygote.products)){
		let changed = false
		window.zygote.products.forEach(prod => {
			if(prod.id in prices && prod.price != prices[prod.id]){
				prod.price = prices[prod.id]
				changed = true
			}
		})
		if(changed){
			zygote.render()
		}
	}
}