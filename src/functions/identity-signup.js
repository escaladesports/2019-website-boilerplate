export function handler({ body }, _, callback){
	console.log(`IDENTITY SIGNUP`)
	console.log(body)
	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			app_metadata: {
				roles: [`admin`],
			},
		}),
	})
}