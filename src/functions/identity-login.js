export function handler(_, __, callback){
	console.log(`IDENTITY LOGIN`)
	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}