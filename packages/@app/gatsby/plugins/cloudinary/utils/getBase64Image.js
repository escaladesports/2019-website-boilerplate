const base64Img = require(`base64-img`)
const createUrl = require(`./createUrl`)

const getBase64Image = imageProps => {
	if (!imageProps) return null
	const { image } = imageProps
	const requestUrl = createUrl(image, { width: 20})
	// TODO add caching.
	return new Promise(resolve => {
		base64Img.requestBase64(requestUrl, (a, b, body) => {
			resolve(body)
		})
	})
}

module.exports = getBase64Image