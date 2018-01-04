exports.modifyWebpackConfig = ({ config, stage, store }, options) => {
	config.loader('markdown', {
		test: /\.md|\.markdown$/,
		loader: 'markdown-with-front-matter-loader',
	})
}