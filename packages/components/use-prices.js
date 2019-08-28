import React, { useReducer, createContext, useContext, useEffect, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import fetch from 'isomorphic-fetch'

const pollInterval = 1 * 60 * 1000	// Minutes
let polling = false
const endpoints = {
	production: `https://m570gzyn6h.execute-api.us-east-1.amazonaws.com/production/`,
	testing: `https://7el25d5l16.execute-api.us-east-1.amazonaws.com/dev/`,
}

async function fetchPrices(ids, setPrices) {
	try {
		const res = await fetch(endpoints.production, {
			method: `POST`,
			body: JSON.stringify({
				skus: ids,
				site: process.env.GATSBY_ESCA_API_SITE,
				url: `https://pricing.escsportsapi.com/load`,
			}),
		})
		const { prices } = await res.json()
		setPrices(prices)
	}
	catch (err) {
		console.error(err)
	}
	setTimeout(() => fetchPrices(ids, setPrices), pollInterval)
}


const dispatch = (_, state) => state

const Context = createContext()

// SSR price and repolls for new price live
export function WithPrices({ children }) {
	const [prices, setPrices] = useReducer(dispatch, {})
	return (
		<Context.Provider value={[prices, setPrices]}>
			{children}
		</Context.Provider>
	)

}

export function usePrices() {
	const { allEscaladePricing } = useStaticQuery(query)

	// Query static data
	const [graphqlPrices, ids] = useMemo(() => {
		const graphqlPrices = {}
		const ids = []
		allEscaladePricing.edges.forEach(({ node }) => {
			ids.push(node.productId)
			graphqlPrices[node.productId] = node
		})
		return [graphqlPrices, ids]
	})

	const [prices, setPrices] = useContext(Context)

	// Poll live data
	useEffect(() => {
		if (typeof window !== `undefined` && !polling) {
			polling = true
			fetchPrices(ids, setPrices)
		}
	}, [])

	return [Object.keys(prices).length ? prices : graphqlPrices, setPrices]
}

const query = graphql`
	query PriceComponent{
		allEscaladePricing{
			edges{
				node{
					productId
					price
				}
			}
		}
	}
`