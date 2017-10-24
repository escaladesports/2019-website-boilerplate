
export default function (id, opt ={}) {
	let products = require(`../../json/category/${id}`).slice(0)
	products = filterHidden(products)
	products = sortProduct(products)
	return products
}

function filterHidden(products) {
	return products.filter(product => {
		if(product.hidden) return false
		return true
	})
}

function sortProduct(products, prop = 'order') {
	return products.sort((a, b) => {
		if (a[prop] < b[prop]) {
			return -1
		}
		if (a[prop] > b[prop]) {
			return 1
		}
		return 0
	})
}