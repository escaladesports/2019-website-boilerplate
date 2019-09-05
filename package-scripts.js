const { series: { nps: series } } = require(`nps-utils`)

module.exports = {
	scripts: {
		build: {
			// Builds all packages
			default: series(
				`build.preweb`,
				`build.web`,
			),
			modules: lerna(`build`, `react-*`),
			preweb: lerna(`build`, [`react-*`, `utils`]),
			utils: lerna(`build`, `utils`),
			web: lerna(`build`, `gatsby-site`),
		},
	},
}

function lerna(script, scopes) {
	if (typeof scopes === `string`) scopes = [scopes]
	scopes = scopes.map(scope => ` --scope "${scope}"`).join(``)
	return `npx lerna run ${script}${scopes} --stream --concurrency 999`
}