
export default function (id, opt ={}) {
	let products = require(`../../json/category/${id}`).slice(0)
	products = filterHidden(products)
	products = sortProduct(products)
	products = removeDuplicateTitles(products)
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

function removeDuplicateTitles(products) {
	let res = []
	let foundProps = []
	products.forEach(product => {
		if (product.title && foundProps.indexOf(product.title) === -1) {
			res.push(product)
			foundProps.push(product.title)
		}
	})
	return res
}