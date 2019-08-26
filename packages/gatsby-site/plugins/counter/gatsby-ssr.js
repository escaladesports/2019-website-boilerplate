const React = require(`react`)
const { WithCounter } = require(`../../src/state/counter`)

console.log(`GATSBY SSR`)

exports.wrapRootElement = ({ element }) => {
	console.log(`GATSBY SSR WRAPROOTELEMENT`)
	return (
		<WithCounter>
			{element}
		</WithCounter>
	)
}