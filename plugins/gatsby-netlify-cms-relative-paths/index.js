const select = require(`unist-util-select`)
const makeRelative = require(`./make-relative`)

module.exports = async ({ markdownNode, markdownAST, getNode }, options) => {
	const imgs = select(markdownAST, `image`)
	if(imgs.length){
		const markdownPath = getNode(markdownNode.parent).absolutePath
		const newPaths = await Promise.all(imgs.map(img => {
			return makeRelative(markdownPath, img.url, options)
		}))
		imgs.forEach((img, key) => {
			img.url = newPaths[key]
		})
		console.log(imgs)
	}
}