

export function handler(body, context, callback){

	console.log(`BODY`, body)
	console.log(`CONTEXT`, context)

	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}