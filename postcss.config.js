module.exports = {
	plugins: [
		require('postcss-easy-import')({prefix: '_'}), // Keep this first
		require('postcss-cssnext')({}),
		require('postcss-nested'),
		require('lost'),
		require('css-mqpacker')({}),
		require('cssnano')({
			autoprefixer: false
		})
	]
}