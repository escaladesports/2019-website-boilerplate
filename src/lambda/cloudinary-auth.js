export function handler(req, _, callback){

	console.log(req)



	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}