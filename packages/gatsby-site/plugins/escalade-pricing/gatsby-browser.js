import React from 'react'
import { WithPrices } from 'components/use-prices'

export function wrapRootElement({ element }) {
	return (
		<WithPrices>
			{element}
		</WithPrices>
	)
}