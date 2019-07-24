import { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useGlobal, setGlobal } from 'reactn'
import fetch from 'isomorphic-fetch'

const pollInterval = 1 * 60 * 1000	// Minutes
let polling = false
const endpoints = {
	production: `https://pricing.escsportsapi.com/load`,
	testing: `https://pricing-test.escsportsapi.com/load`,
}

async function fetchPrices(ids) {
	console.log(`fetchPrices`, ids)
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
		for (let id in res) {
			if (res[id].price) {
				res[id].price = `1` + res[id].price
				prices[id] = res[id]
				console.log(`prices[id]`, prices[id])
			}
		}
		console.log(`prices from api`, prices)
		setGlobal({ prices })
	}
	catch (err) {
		console.error(err)
	}
	setTimeout(() => fetchPrices(ids), pollInterval)
}

// SSR price and repolls for new price live
export default function usePrice(){
	const [prices, setPrices] = useGlobal(`prices`)

	// Query static data
	const { allEscaladePricing: { edges } } = useStaticQuery(query)
	const graphqlPrices = {}
	const ids = []
	edges.forEach(({ node }) => {
		ids.push(node.productId)
		graphqlPrices[node.productId] = node
	})

	// Poll live data
	useEffect(() => {
		if(typeof window !== `undefined` && !polling){
			polling = true
			fetchPrices(ids)
		}
	}, [])


	// Set initial state from static data
	if (!prices) {
		console.log(`graphqlPrices`, graphqlPrices)
		setPrices(graphqlPrices)
	}

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