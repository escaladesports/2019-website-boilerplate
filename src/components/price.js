import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { useGlobal } from 'reactn'

// SSR price and repolls for new price live
export default function Price({ id, children }){
	const [prices] = useGlobal(`prices`)
	let latestPrice
	if(prices && prices[id]){
		latestPrice = prices[id].price
	}
	return (
		<StaticQuery
			query={graphql`
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
			`}
			render={({ allEscaladePricing: { edges }}) => {
				if (!latestPrice) {
					const upperId = id.toUpperCase()
					for (let i = edges.length; i--;) {
						const { node } = edges[i]
						if (node.productId === upperId) {
							latestPrice = node.price
						}
					}
				}
				if (typeof children === `function`) {
					return children(latestPrice)
				}
				return latestPrice
			}}
		/>
	)
}
