import React, { useReducer, createContext, useContext, useEffect } from 'react'
import fetchPrices from './fetch'

let polling = false

const reducer = (_, action) => action

const Context = createContext()

// SSR price and repolls for new price live
export function WithPrices({ children }) {
	const [prices, setPrices] = useReducer(reducer, {})

	console.log(`WITH PRICES`, prices)
	return (
		<Context.Provider value={[prices, setPrices]}>
			{children}
		</Context.Provider>
	)
}

export function usePrices(id, ids, endpoint) {
	// console.log(`IDS: `, id, ids)
	// If fetching all pricing
	if(!ids && typeof id === `object`){
		ids = id
		id = null
	}

	const [prices, setPrices] = useContext(Context)
	// console.log(prices, setPrices)
	// Poll live data
	useEffect(() => {
		if (typeof window !== `undefined` && !polling && ids) {
			polling = true
			fetchPrices(ids, setPrices, endpoint)
		}
	})

	return [id ? prices[id]?.price : prices, setPrices]
}