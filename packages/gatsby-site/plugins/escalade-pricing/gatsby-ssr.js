import React from 'react'
import { WithPrices } from 'components/use-prices'

export function wrapRootElement({ element }){
	console.log(`GATSBY SSR`)
	return (
		<WithPrices>
			{element}
		</WithPrices>
	)
}