const {
	ESCA_API_KEY,
	X_API_KEY,
	X_API_KEY_TEST,
	GATSBY_ESCA_API_SITE,
} = require(`utils/env`)

module.exports = {
	redirects: [
		{
			from: `/admin/static/*`,
			to: `/admin/static/:splat`,
			status: 200,
		},
		{
			from: `/admin/*`,
			to: `/admin/index.html`,
			status: 200,
		},
		{
			from: `/admin`,
			to: `/admin/index.html`,
			status: 200,
		},
		{
			from: `/api/pricing/load`,
			to: `https://pricing.escsportsapi.com/load`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"ESC-API-Key": ESCA_API_KEY,
				"X-API-Key": X_API_KEY,
				"ESC-API-Context": GATSBY_ESCA_API_SITE,
			},
		},
		{
			from: `/test/api/pricing/load`,
			to: `https://pricing-test.escsportsapi.com/load`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"ESC-API-Key": ESCA_API_KEY,
				"X-API-Key": X_API_KEY_TEST,
				"ESC-API-Context": GATSBY_ESCA_API_SITE,
			},
		},
		{
			from: `/api/inventory/load`,
			to: `https://inventory.escsportsapi.com/load`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"ESC-API-Key": ESCA_API_KEY,
				"X-API-Key": X_API_KEY,
				"ESC-API-Context": GATSBY_ESCA_API_SITE,
			},
		},
		{
			from: `/api/coupon/calculate`,
			to: `https://coupon.escsportsapi.com/calculate`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"ESC-API-Key": ESCA_API_KEY,
				"X-API-Key": X_API_KEY,
				"ESC-API-Context": GATSBY_ESCA_API_SITE,
			},
		},
		{
			from: `/api/products/shipping`,
			to: `https://products.escsportsapi.com/shipping`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"ESC-API-Key": ESCA_API_KEY,
				"X-API-Key": X_API_KEY,
				"ESC-API-Context": GATSBY_ESCA_API_SITE,
			},
		},
		{
			from: `/api/shipping/load`,
			to: `https://shipping.escsportsapi.com/load`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"ESC-API-Key": ESCA_API_KEY,
				"X-API-Key": X_API_KEY,
				"ESC-API-Context": GATSBY_ESCA_API_SITE,
			},
		},
		{
			from: `/api/orders/store`,
			to: `https://orders.escsportsapi.com/store`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"ESC-API-Key": ESCA_API_KEY,
				"X-API-Key": X_API_KEY,
				"ESC-API-Context": GATSBY_ESCA_API_SITE,
			},
		},
		{
			from: `/api/pay/paypal`,
			to: `https://pay.escsportsapi.com/paypal/verify`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"X-API-Key": X_API_KEY,
			},
		},
		{
			from: `/api/pay/anet`,
			to: `https://pay.escsportsapi.com/pay/anet`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"X-API-Key": X_API_KEY,
			},
		},
		{
			from: `/api/taxes/calculate`,
			to: `https://taxes.escsportsapi.com/calculate`,
			status: 200,
			force: true,
			headers: {
				"Content-Type": `application/json`,
				"ESC-API-Key": ESCA_API_KEY,
				"X-API-Key": X_API_KEY,
				"ESC-API-Context": GATSBY_ESCA_API_SITE,
			},
		},
	],
}