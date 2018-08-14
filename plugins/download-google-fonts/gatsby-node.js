const GoogleFontsWebpackPlugin = require(`google-fonts-plugin`).default

exports.modifyWebpackConfig = ({ config }) => {
	config.plugin(`google-fonts`, GoogleFontsWebpackPlugin, [{
		fonts: [
			{
				family: `Roboto`,
				variants: [
					`400`,
					`400i`,
					`700`,
					`700i`,
				],
				subsets: [
					`latin`,
					`latin-ext`,
				],
			},
		],
		formats: [
			`woff2`,
			`woff`,
		],
		outputDir: `.cache/google-fonts`,
		encode: false,
		minify: false,
	}])
	return config
}