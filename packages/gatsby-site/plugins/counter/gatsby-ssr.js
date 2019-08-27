import React from 'react'
import { WithCounter } from '../../src/state/counter'

console.log(`\n\n\nGATSBY SSR\n\n\n`)

export const wrapRootElement = ({ element }) => {
	console.log(`GATSBY SSR WRAPROOTELEMENT`)
	return (
		<WithCounter>
			{element}
		</WithCounter>
	)
}

export const onRenderBody = ({ setPreBodyComponents }) => {
	console.log(`\n\n\nONRENDERBODY\n\n\n`)
	setPreBodyComponents([
		<div key='test'>TEST</div>,
	])
}