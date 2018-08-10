export function handler(_, __, callback){
	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}