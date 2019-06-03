import postProcess from './post-process'

export async function onPostBuild(_, {
	publicPath = `email-templates`,
	siteUrl = process.env.URL,
}){
	await postProcess(publicPath, siteUrl)
}