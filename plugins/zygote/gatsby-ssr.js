const React = require(`react`)
// const { Cart } = require(`@escaladesports/zygote-cart`)
// const escaApi = require(`@escaladesports/zygote-plugin-esca-api`)
// const standardPayment = require(`@escaladesports/zygote-cart/dist/plugins/zygote-plugin-standard-billing`)

console.log(`\n\n\nSSR\n\n\n`)
exports.onRenderBody = ({ setPreBodyComponents }) => {
	console.log(`\n\n\nONRENDERBODY\n\n\n`)
	setPreBodyComponents([
		<div key='test'>TEST</div>,
	])
	// setPostBodyComponents([
	// 	<Cart
	// 		key='zygote'
	// 		infoWebhook='/api/inventory/load'
	// 		splitName={true}
	// 		plugins={[
	// 			standardPayment,
	// 			escaApi,
	// 		]}
	// 		totalModifications={[
	// 			{
	// 				id: `shipping`,
	// 				description: `Shipping`,
	// 				displayValue: `-`,
	// 			},
	// 			{
	// 				id: `tax`,
	// 				description: `Tax`,
	// 				displayValue: `-`,
	// 			},
	// 		]}
	// 	/>,
	// ])

}