const cacheImage = require(`./cacheImage`)
const path = require(`path`)

module.exports = async (args, store) => {
	const { traceSVG } = require(`gatsby-plugin-sharp`)

	const { image, options } = args
	const {
		resourceType,
	} = image

	if (resourceType.indexOf(`image`) !== 0) {
		return null
	}

	const absolutePath = await cacheImage(store, image, options)
	const extension = path.extname(absolutePath)

	return traceSVG({
		file: {
			internal: image.internal,
			name: image.publicId,
			extension,
			absolutePath,
		},
		args: { toFormat: `` },
		fileArgs: options,
	})
}