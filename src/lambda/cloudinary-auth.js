

export function handler(body, context, callback){

	console.log(`BODY`, body)
	console.log(`CONTEXT`, context)
	console.log(`ENV`, process.env)

	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}