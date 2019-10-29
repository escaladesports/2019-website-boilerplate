const crypto = require(`crypto`)
const path = require(`path`)

const cacheImage = require(`./cacheImage`)

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
	if(!absolutePath) return null
	const extension = path.extname(absolutePath)

	const tracedArgs = {
		file: {
			internal: image.internal,
			name: crypto // do this because publicId can have name like "one/two/three" and can mess with path
				.createHash(`md5`)
				.update(JSON.stringify(image.publicId))
				.digest(`hex`),
			extension,
			absolutePath,
		},
		args: { toFormat: `` },
		fileArgs: options,
	}
	return traceSVG(tracedArgs)
}