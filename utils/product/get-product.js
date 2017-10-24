const cache = {}
export default function (id) {
	if(cache[id]) return cache[id]
	let product = Object.assign({}, require(`../../json/product/${id}`))
	cache[id] = product
	return product
}
