import React from 'react'
import { WithCounter } from '../../src/state/counter'

console.log(`GATSBY SSR`)

export function wrapRootElement({ element }) {
	console.log(`GATSBY SSR WRAPROOTELEMENT`)
	return (
		<WithCounter>
			{element}
		</WithCounter>
	)
}