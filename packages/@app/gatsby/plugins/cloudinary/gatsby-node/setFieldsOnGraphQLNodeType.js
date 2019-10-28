const {
	fixedNodeType,
	// fluidNodeType,
	// resizeNodeType,
} = require(`../gql/types`)
const getTracedSVG = require(`../utils/getTracedSVG`)

module.exports = ({ type, store }) => {
	if(type.name.match(/cloudinary/i)){
		const fixedNode = fixedNodeType({
			name: `CloudinaryFixed`,
			getTracedSVG,
			store,
		})
		// const fluidNode = fluidNodeType({
		// 	name: `CloudinaryFluid`,
		// 	getTracedSVG: getTracedSVG(store),
		// })
		// const resizeNode = resizeNodeType({
		// 	name: `CloudinaryResize`,
		// 	getTracedSVG: getTracedSVG(store),
		// })

		return {
			fixed: fixedNode,
			// fluid: fluidNode,
			// resize: resizeNode,
		}
	}

	return {}
}