
exports.modifyWebpackConfig = ({ config, stage, store }, options) => {
	config.loader('markdown', {
		test: /\.md$/,
		loaders: ['mardownit-loader'],
	})
}
