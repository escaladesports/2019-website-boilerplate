const select = require(`unist-util-select`)
const makeRelative = require(`./make-relative`)

module.exports = async ({ markdownNode, markdownAST, getNode }, options) => {
	const imgs = select(markdownAST, `image`)
	if(imgs.length){
		const { absolutePath } = getNode(markdownNode.parent)
		const newPaths = await Promise.all(imgs.map(({ url }) => {
			return makeRelative(absolutePath, url, options)
		}))
		imgs.forEach((img, key) => {
			img.url = newPaths[key]
		})
	}
}