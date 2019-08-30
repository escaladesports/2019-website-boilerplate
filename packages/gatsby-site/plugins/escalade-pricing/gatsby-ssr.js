import React from 'react'
import { WithPrices } from 'react-escalade-pricing'

export const wrapRootElement = ({ element }) => {
	return (
		<WithPrices>
			{element}
		</WithPrices>
	)
}