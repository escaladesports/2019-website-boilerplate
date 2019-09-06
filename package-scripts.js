const { series: { nps: series } } = require(`nps-utils`)

module.exports = {
	scripts: {
		build: {
			// Builds all packages
			default: `npx nps build.all`,
			all: series(
				`build.preweb`,
				`build.web`,
			),
			preweb: lerna(`build`, [`react-*`, `utils`]),
			web: lerna(`build`, `gatsby-site`),
		},
		dev: {
			// Spins up dev servers in all packages
			default: series(
				`build.preweb`,
				`dev.all`,
			),
			all: lerna(`dev`),
		},
	},
}

function lerna(script, scopes = []) {
	if (typeof scopes === `string`) scopes = [scopes]
	scopes = scopes.map(scope => ` --scope "${scope}"`).join(``)
	return `npx lerna run ${script}${scopes} --stream --concurrency 999`
}