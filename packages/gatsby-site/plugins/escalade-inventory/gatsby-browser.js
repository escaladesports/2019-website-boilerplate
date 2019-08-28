import React from 'react'
import { WithInventory } from '@escaladesports/react-escalade-inventory'

export function wrapRootElement({ element }) {
	return (
		<WithInventory>
			{element}
		</WithInventory>
	)
}