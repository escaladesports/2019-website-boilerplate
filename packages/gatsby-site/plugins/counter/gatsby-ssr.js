import React from 'react'
import { WithCounter } from '../../src/state/counter'

export function wrapRootElement({ element }) {
	return (
		<WithCounter>
			{element}
		</WithCounter>
	)
}