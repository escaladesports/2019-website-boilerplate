import React from 'react'
import { WithPrices } from 'components/use-prices'

export const wrapRootElement = ({ element }) => {
	console.log(`GATSBY SSR`)
	return (
		<WithPrices>
			{element}
		</WithPrices>
	)
}