'use strict'
import fetchStock from 'utils/product/get-stock'
import env from 'json/env.json'

const pollingInterval = 20 * 60 * 1000
const events = []
let timeoutId

// Initiates stock update interval
export function initStock() {
	if (!window.initStockInterval) {
		window.initStockInterval = true
		if (env.ENABLE_ECOMMERCE) {
			updateStock()
				.then(setStockTimeout)
				.catch(err => {
					console.error(err)
					setStockTimeout()
				})
		}
	}
}

// Updates global stock
export function updateStock() {
	return fetchStock()
		.then(stock => {
			window.productStock = stock
			events.forEach(event => event(stock))
			setStockTimeout()
			return stock
		})
		.catch(err => {
			console.error(err)
			setStockTimeout()
		})
}


export function addStockEvent(fn) {
	if (env.ENABLE_ECOMMERCE) {
		events.push(fn)
	}
}

export function removeStockEvent(fn) {
	if (env.ENABLE_ECOMMERCE) {
		let i = events.indexOf(fn)
		if (i > -1) {
			events.splice(i, 1)
		}
	}
}

function setStockTimeout() {
	clearTimeout(timeoutId)
	timeoutId = setTimeout(updateStock, pollingInterval)
}