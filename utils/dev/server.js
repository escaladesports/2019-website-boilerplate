'use strict'
require('dotenv').config({ silent: true })
const express = require('express')
const next = require('next')
const portScanner = require('portscanner')
const exec = require('child-process-promise').exec
const fs = require('fs-extra')
const open = require('open')
const moduleAlias = require('module-alias')


const dev = process.env.NODE_ENV !== 'production'
const config = require('../../next.config')
const router = config.exportPathMap
const transform = require('../images/transform-image')
const ports = require('./ports')
const baseDir = __dirname.replace(/\/utils\/dev$/, '')


if (dev) {
	/*
	moduleAlias.addAlias('react', 'preact-compat')
	moduleAlias.addAlias('react-dom', 'preact-compat')
	*/
}

console.log('Checking for sync files...')
fs.pathExists('./json')
	.then(exists => {
		if (exists) return Promise.resolve()
		console.log('Running sync...')
		return exec('npm run sync')
	})
	.then(() => {
		console.log('Finding unused port...')
		return portScanner.findAPortNotInUse(ports)
	})
	.then(port => {
		const app = next({
			dev: dev,
			config: config
		})
		const handle = app.getRequestHandler()
		app.prepare()
			.then(router)
			.then(routes => {
				console.log(`Exposing app on port ${port}...`)
				const server = express()
				//console.log('ROUTES:', JSON.stringify(routes, null, 3))
				for (let i in routes) {
					server.get(i, (req, res) => {
						app.render(req, res, routes[i].page, routes[i].query)
					})
				}
				server.get('*', (req, res, next) => {
					// If image operations
					if(
						req.params[0] &&
						req.params[0].indexOf('/static/') === 0
					) {
						transform(req.params[0], { cwd: baseDir})
							.then(file => res.sendFile(`${baseDir}${file}`))
							.catch(() => next())
					}
					else {
						next()
					}
				})
				server.get('*', (req, res) => handle(req, res))
				server.listen(port)
				open(`http://localhost:${port}`)
			})

	})
	.catch(err => {
		throw new Error(err)
	})