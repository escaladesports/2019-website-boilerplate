module.exports = {
	devtool: `source-map`,
	optimization: { minimize: false },
	module: {
		rules: [
			{
				type: `javascript/auto`,
				test: /\.mjs$/,
				use: [],
			},
		],
	},
}