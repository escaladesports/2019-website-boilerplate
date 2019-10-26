module.exports = (image, options = {}) => {
	let path = image.secureUrl.split(`/`)
	const name = path.pop()
	path = path.join(`/`)
	const args = {
		w: options.width,
		h: options.height,
		c: options.crop,
		fl: options.jpegProgressive ? `progressive` : null,
		q: options.quality,
		dpr: options.dpr,
		g: options.gravity,
		f: options.format,
		bg: options.background,
	}

	const transformations = []
	for(let key in args){
		if(!args[key]) continue
		transformations.push(`${key}_${args[key]}`)
	}
	const url = `${path}/${transformations.join(`,`)}/${name}`

	console.log(`CREATE URL: `, url)
	return url
}