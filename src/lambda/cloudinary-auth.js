export function handler({ body }, _, callback){

	console.log(JSON.parse(body))




	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}