const {
	readFile,
	pathExists,
	ensureDir,
} = require(`fs-extra`)
const { parse } = require(`url`)
const glob = require(`globby`)
const getUrls = require(`get-urls`)
const download = require(`download`)

// const formatOrder = [
// 	//`eot`,
// 	`woff2`,
// 	`woff`,
// 	//`ttf`,
// 	//`svg`,
// ]

module.exports = async () => {

	// Extract URLs from CSS
	const cssFiles = await glob(`./.cache/google-fonts/*.css`)
	const cssData = await Promise.all(cssFiles.map(path => {
		return readFile(path, `utf8`)
	}))
	const fontLinks = []
	cssData.forEach(data => {
		fontLinks.push(...getUrls(data))
	})

	// Download font files
	const domains = []
	const fontPaths = []
	for(let i = fontLinks.length; i--;){
		const url = fontLinks[i].split(`)`)[0]
		const { pathname, protocol, hostname } = parse(url)
		const origin = `${protocol}//${hostname}`
		if(domains.indexOf(origin) === -1){
			domains.push(origin)
		}
		if (fontPaths.indexOf(pathname) === -1){
			fontPaths.push(pathname)
		}
		if(!await pathExists(`./.cache/google-fonts${pathname}`)){
			let dirPath = pathname.split(`/`)
			dirPath.pop()
			dirPath = dirPath.join(`/`)
			dirPath = `./.cache/google-fonts${dirPath}`
			await ensureDir(dirPath)
			await download(url, dirPath)
		}
	}

	// Replace domains with relative paths in CSS
	const relativeCss = cssData.map(data => {
		domains.forEach(domain => {
			while (data.indexOf(domain) !== -1) {
				data = data.replace(domain, ``)
			}
		})
		return data
	})

	console.log(relativeCss)



	process.exit(0)
}