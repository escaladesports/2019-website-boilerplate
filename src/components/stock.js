import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { useGlobal } from 'reactn'

// SSR stock and repolls for changed stock live
export default function Stock({ id, children }){
	const [inventory] = useGlobal(`inventory`)
	let latestInventory
	if (inventory && inventory[id]) {
		latestInventory = inventory[id].stock
	}

	return (
		<StaticQuery
			query={graphql`
				query StockComponent{
					allEscaladeInventory{
						edges{
							node{
								productId
								stock
							}
						}
					}
				}
			`}
			render={({ allEscaladeInventory: { edges } }) => {
				if (!latestInventory) {
					const upperId = id.toUpperCase()
					for (let i = edges.length; i--;) {
						const { node } = edges[i]
						if (node.productId === upperId) {
							latestInventory = node.stock
						}
					}
				}
				if (typeof children === `function`) {
					return children(latestInventory)
				}
				return latestInventory
			}}
		/>
	)
}
