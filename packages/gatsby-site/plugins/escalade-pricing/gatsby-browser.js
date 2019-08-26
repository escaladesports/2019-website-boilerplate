import React from 'react'
import { WithPrices } from '../../src/components/use-prices'

export function wrapRootElement({ element }) {
	console.log(`wrapRootElement WithPrices`)
	return (
		<WithPrices>
			{element}
		</WithPrices>
	)
}