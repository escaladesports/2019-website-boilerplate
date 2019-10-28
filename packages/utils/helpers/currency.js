const formatPrice = (price) => {
	if(isNaN(+price)){
		return `0.00`
	}
	price = (+price).toLocaleString(`en-US`, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	return price
}

const dollarsToCents = (price) => {
	const centsString = formatPrice(price).replace(/\D/g, ``)
	const centsNum = +centsString
	return centsNum
}

module.exports = { formatPrice, dollarsToCents }