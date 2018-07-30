const { relative, dirname } = require(`path`)
const getConfig = require(`./get-config`)

const cwd = process.cwd()

module.exports = async (markdownPath, imagePath, options) => {
	const { mediaPath, publicPath } = await getConfig(options)
	if(
		typeof imagePath !== `string` ||
		imagePath.indexOf(`${publicPath}/`) !== 0
	){
		return imagePath
	}
	let path = dirname(markdownPath).replace(`${cwd}/`, ``)
	imagePath = imagePath.replace(publicPath, mediaPath)
	const newPath = relative(path, imagePath)
	return newPath
}