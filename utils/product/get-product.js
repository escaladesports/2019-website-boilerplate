const cache = {}

export default function (id) {
	if(cache[id]) return cache[id]
	let product = Object.assign({}, require(`../../json/product/${id}`))

	// Unpack product variants
	let variants = product.variants
	delete product.variants
	if (variants) {
		for (let i in variants) {
			let obj = Object.assign({}, product, variants[i])
			variants[i] = obj
		}
		variants[product.id] = Object.assign({}, product)
	}

	let obj = {
		product: product,
		variants: variants || {}
	}
	cache[id] = obj

	return obj
}
