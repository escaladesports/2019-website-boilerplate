export default function (product) {
	let variants = product.variants
	delete product.variants
	if (variants) {
		for (let i in variants) {
			let obj = Object.assign({}, product, variants[i])
			variants[i] = obj
		}
		variants[product.id] = Object.assign({}, product)
	}
	return variants
}