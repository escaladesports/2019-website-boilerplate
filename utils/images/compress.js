'use strict'
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminZopfli = require('imagemin-zopfli')
const gulpStreamToPromise = require('gulp-stream-to-promise')

module.exports = () => {
	console.log('Compressing images...')
	let stream = gulp.src('./dist/**/*.{jpg,png,svg}')
		.pipe(imagemin([
			// PNG
			imageminPngquant({
				speed: 1,
				quality: 98
			}),
			imageminZopfli({
				more: true
			}),
			// SVG
			imagemin.svgo({
				plugins: [{
					removeViewBox: false
				}]
			}),
			// JPG
			imagemin.jpegtran({
				progressive: true
			})
		]))
		.pipe(gulp.dest('./dist'))

	return gulpStreamToPromise(stream)
		.then(() => console.log('Done compressing images.'))

}