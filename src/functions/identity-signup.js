const whitelist = [
	`escaladesports.com`,
]

export function handler({ body }, _, callback){
	console.log(`identity-signup`)
	const { user } = JSON.parse(body)
	const { email } = user
	const domain = email.split(`@`)[1]
	let res = ``
	let statusCode = 400
	console.log(domain)
	if(whitelist.indexOf(domain) !== -1){
		statusCode = 200
		res = JSON.stringify({
			app_metadata: {
				roles: [`admin`],
			},
		})
	}
	callback(null, {
		statusCode,
		body: res,
	})
}