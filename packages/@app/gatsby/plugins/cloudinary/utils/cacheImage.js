// NEEDS TO BE RE WRITTEN FOR CLOUDINARY

const crypto = require(`crypto`)
const { resolve } = require(`path`)

const axios = require(`axios`)
const { pathExists, createWriteStream } = require(`fs-extra`)
const createUrl = require(`./createUrl`)

module.exports = async function cacheImage(store, image, options) {
	const program = store.getState().program
	const CACHE_DIR = resolve(`${program.directory}/.cache/cloudinary/assets/`)
	const {
		url,
		publicId,
		height: actualHeight,
		width: actualWidth,
		format,
	} = image
	const {
		width,
		height,
		maxWidth,
		maxHeight,
		crop,
		gravity,
		background,
	} = options
	const userWidth = maxWidth || width
	const userHeight = maxHeight || height

	const aspectRatio = actualHeight / actualWidth
	const resultingWidth = Math.round(userWidth || 800)
	const resultingHeight = Math.round(userHeight || resultingWidth * aspectRatio)

	const params = { width: resultingWidth, height: resultingHeight}

	if (crop) {
		params.crop = crop
	}
	if (gravity) {
		params.gravity = gravity
	}
	if (background) {
		params.background = background
	}

	const optionsHash = crypto
		.createHash(`md5`)
		.update(JSON.stringify([url, ...params]))
		.digest(`hex`)

	const name = publicId
	const ext = format
	const absolutePath = resolve(CACHE_DIR, `${name}-${optionsHash}${ext}`)

	const alreadyExists = await pathExists(absolutePath)

	if (!alreadyExists) {
		const previewUrl = createUrl(image, params, true)

		const response = await axios({
			method: `get`,
			url: previewUrl,
			responseType: `stream`,
		})

		await new Promise((resolve, reject) => {
			const file = createWriteStream(absolutePath)
			response.data.pipe(file)
			file.on(`finish`, resolve)
			file.on(`error`, reject)
		})
	}

	return absolutePath
}