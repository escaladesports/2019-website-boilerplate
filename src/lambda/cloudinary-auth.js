

export function handler(body, context, callback){

	console.log(`body`, body)
	console.log(`context`, context)
	console.log(`env`, process.env)

	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}