'use strict'
const regSpace = / /g
module.exports = (url, ...args) => {
	url = url.split('/')
	let name = url.pop()
	args = args.map(arg => {
		if (typeof arg === 'object') {
			return arg.join(',')
		}
		return arg.replace(regSpace, '')
	})
	url.push(args.join('/'))
	return `${url.join('/')}/${name}`
}