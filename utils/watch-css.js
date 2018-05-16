'use strict'
const chokidar = require('chokidar')
const exec = require('child_process').exec

chokidar.watch('./src/**/*.css').on('change', event => {
	exec('rm -rf ./node_modules/.cache', (err, stdout, stderr) => {
		if(err){
			console.error(err)
		}
		if(stderr){
			console.error(stderr)
		}
	})
})