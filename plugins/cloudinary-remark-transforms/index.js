const select = require(`unist-util-select`)

module.exports = async ({ markdownAST }, { cloudName, transforms = `c_scale,w_1200` }) => {
	const imgs = select(markdownAST, `image`)
	imgs.forEach(img => {
		img.url = `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${img.url}`
	})
}