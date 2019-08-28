import React from 'react'
import { WithPrices } from 'components/use-prices'

export const wrapRootElement = ({ element }) => {
	return (
		<WithPrices>
			{element}
		</WithPrices>
	)
}