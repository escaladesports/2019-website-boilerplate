
export default function (id) {
	let product = require(`../../json/product/${id}`)

	// Unpack product variants
	for (let i in product.variants) {
		let obj = Object.assign({}, product, product.variants[i])
		delete obj.variants
		product.variants[i] = obj
	}

	return product
}
