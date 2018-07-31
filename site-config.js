const {
	CONTEXT,
	URL,
	DEPLOY_URL,
} = process.env
const siteUrl = CONTEXT === `production` ? URL : DEPLOY_URL

console.log(`siteUrl`, siteUrl)

module.exports = {
	title: `Gatsby Boilerplate`,
	shortTitle: `Boilerplate`,
	description: `A boilerplate for new Gatsby projects.`,
	siteUrl,
}