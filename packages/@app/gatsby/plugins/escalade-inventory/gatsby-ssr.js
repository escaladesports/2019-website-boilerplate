import React from 'react'
import { WithInventory } from 'react-escalade-inventory'

export const wrapRootElement = ({ element }) => {
	return (
		<WithInventory>
			{element}
		</WithInventory>
	)
}