const postProcess = require(`./post-process`)

exports.onPostBuild = async (_, { files }) => {
	await postProcess(files)
}