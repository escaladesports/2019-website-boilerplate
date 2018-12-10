const postProcess = require(`./post-process`)

exports.onPostBuild = async (_, {
	publicPath = `email-templates`,
	siteUrl = process.env.URL,
}) => {
	await postProcess(publicPath, siteUrl)
}