'use strict'
const exec = require('child-process-promise').exec
const fs = require('fs-extra')
const cpy = require('cpy')
const curPkg = require('../package.json')

console.log('Updating boilerplate...')
fs.remove('temp-update')
	.then(() => {
		console.log('Cloning most recent boilerplate...')
		return exec('git clone git@github.com:escaladesports/boilerplate.git --depth 1 temp-update')
	})
	.then(() => {
		console.log('Copying relevant boilerplate files...')
		return cpy([
			'admin/index.html',
			'config/.htmlmin',
			'utils/**/*',
			'.babelrc',
			'.nvmrc',
			'.env-sample',
			'next.config.js',
			'postcss.config.js',
			'server.js',
			'README.md',
			'components/util/**/*'
		], '../', {
			cwd: 'temp-update',
			parents: true
		})
	})
	.then(() => {
		console.log('Adding new dependencies...')
		const newPkg = require('../temp-update/package.json')
		let newDep = {}
		let newDevDep = {}
		for(let i in newPkg.dependencies){
			if(!(i in curPkg.dependencies) || curPkg.dependencies[i] !== newPkg.dependencies[i]){
				newDep[i] = newPkg.dependencies[i]
			}
		}
		for(let i in newPkg.devDependencies){
			if(!(i in curPkg.devDependencies) || curPkg.devDependencies[i] !== newPkg.devDependencies[i]){
				newDevDep[i] = newPkg.devDependencies[i]
			}
		}
		let promises = []
		for(let i in newDep){
			promises.push(exec(`yarn add ${i}@${newDep[i]}`))
		}
		for(let i in newDevDep){
			promises.push(exec(`yarn add ${i}@${newDevDep[i]}`))
		}
		return Promise.all(promises)
	})
	.then(() => {
		console.log('Adding new scripts...')
		const newPkg = require('../temp-update-package.json')
		const overwritePkg = Object.assign({}, curPkg)
		if (!overwritePkg.scripts) overwritePkg.scripts = {}
		if (!newPkg.scripts) newPkg.scripts = {}
		for(let i in newPkg.scripts){
			if (overwritePkg.scripts[i] !== newPkg.scripts[i]){
				overwritePkg.scripts[i] = newPkg.scripts[i]
			}
		}
		return fs.outputJson('../package.json', overwritePkg, { spaces: 2 })
	})
	.then(() => {
		console.log('Removing temporary files...')
		return Promise.all([
			fs.remove('temp-update')
		])
	})
	.then(() => console.log('Done updating boilerplate.'))
	.catch(err => { throw err })