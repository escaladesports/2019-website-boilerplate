import React, { useReducer, createContext, useContext, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import fetch from 'isomorphic-fetch'

const pollInterval = 1 * 60 * 1000	// Minutes
let polling = false
const endpoints = {
	production: `https://pricing.escsportsapi.com/load`,
	testing: `https://pricing-test.escsportsapi.com/load`,
}

async function fetchPrices(ids, setPrices) {
	try {
		const res = await fetch(endpoints.production, {
			headers: {
				'ESC-API-Context': process.env.GATSBY_ESCA_API_SITE,
			},
			method: `POST`,
			body: JSON.stringify({
				skus: ids,
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
	// Query static data
	const { allEscaladePricing: { edges } } = useStaticQuery(query)
	const graphqlPrices = {}
	const ids = []
	edges.forEach(({ node }) => {
		ids.push(node.productId)
		graphqlPrices[node.productId] = node
	})

	const [prices, setPrices] = useContext(Context)

	// Poll live data
	useEffect(() => {
		if (typeof window !== `undefined` && !polling) {
			polling = true
			fetchPrices(ids, setPrices)
		}
	}, [])


	return [prices || graphqlPrices, setPrices]
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