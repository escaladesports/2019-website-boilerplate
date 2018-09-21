const crypto = require(`crypto`)
const readMarkdown = require(`read-markdown`).default

function unpackAllVariants(arr, options) {
	let res = []
	arr.forEach(product => {
		let products = unpackVariants(product, options)
		res = res.concat(products)
	})
	return res
}

function unpackVariants(obj, options) {
	let parent = {
		...obj,
		variant: false,
	}
	if (typeof parent.variants !== `object`) {
		return [parent]
	}
	let products = [parent]
	let ids = [parent[options.id]]
	let variants = parent.variants
	delete parent.variants
	variants.forEach(product => {
		product = {
			...obj,
			...product,
			variant: true,
		}
		ids.push(product[options.id])
		products.push(product)
	})
	products.forEach(product => {
		let productsClone = products.map(product => {
			let obj = {
				...product,
			}
			delete obj.variants
			return obj
		})
		let variantsArr = [...productsClone]

		for (let i = variantsArr.length; i--;) {
			if (variantsArr[i].id === product.id) {
				variantsArr.splice(i, 1)
			}
		}

		product.variants = variantsArr
	})
	return products
}

module.exports = async function ({ boundActionCreators }, options) {
	options = {
		id: `id`,
		path: `./src/markdown/products/**/*.md`,
		body: `body`,
		...options,
	}
	const { createNode } = boundActionCreators

	let data = await readMarkdown(options.path, { results: `array` })
	data = data.map(data => {
		data.data[options.body] = data.content
		return data.data
	})
	data = unpackAllVariants(data, options)
	data.forEach(datum => {
		datum.productId = datum[options.id]
		datum = {
			parent: null,
			children: [],
			internal: {
				type: `ProductMarkdown`,
				contentDigest: crypto
					.createHash(`md5`)
					.update(JSON.stringify(datum))
					.digest(`hex`),
			},
			...datum,
			id: `ProductMarkdown-${datum[options.id]}`,
		}
		createNode(datum)
	})
}