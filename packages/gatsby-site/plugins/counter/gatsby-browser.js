import React from 'react'
import { WithCounter } from '../../src/state/counter'

export const wrapRootElement = ({ element }) => {
	return (
		<WithCounter>
			{element}
		</WithCounter>
	)
}