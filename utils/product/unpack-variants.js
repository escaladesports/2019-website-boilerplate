const cache = {}
export default function (product) {
	if(cache[product.id]) return cache[product.id]
	let variants = Object.assign({}, product.variants)
	if (variants) {
		for (let i in variants) {
			let obj = Object.assign({}, product, variants[i])
			variants[i] = obj
		}
		variants[product.id] = Object.assign({}, product)
	}
	cache[product.id] = variants
	return variants
}