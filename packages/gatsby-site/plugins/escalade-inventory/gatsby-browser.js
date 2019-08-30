import React from 'react'
import { WithInventory } from 'react-escalade-inventory'

export function wrapRootElement({ element }) {
	return (
		<WithInventory>
			{element}
		</WithInventory>
	)
}