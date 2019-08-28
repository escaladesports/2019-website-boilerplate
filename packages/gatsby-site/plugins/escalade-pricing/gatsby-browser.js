import React from 'react'
import { WithPrices } from '@escaladesports/react-escalade-pricing'

export function wrapRootElement({ element }) {
	return (
		<WithPrices>
			{element}
		</WithPrices>
	)
}