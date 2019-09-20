import React from 'react'
import { WithPrices } from 'react-escalade-pricing'

export function wrapRootElement({ element }) {
	return (
		<WithPrices>
			{element}
		</WithPrices>
	)
}