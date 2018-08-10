const { request } = require(`https`)
const { parse } = require(`url`)

module.exports = ({ secrets }, cb) => {
	const { BUILD_HOOK } = secrets

	const { host, pathname } = new parse(BUILD_HOOK)
	const options = {
		method: `POST`,
		host,
		path: pathname,
	}

	const req = request(options, res => {
		res.setEncoding(`utf8`)
		res.on(`data`, (chunk) => {
			console.log(chunk)
		})
		res.on(`end`, () => {
			cb(null, { success: true })
		})
	})

	req.on(`error`, (e) => {
		cb(e.message)
	})

	req.end()
}