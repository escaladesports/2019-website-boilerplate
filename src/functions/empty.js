export function handler(_, __, callback){
	callback(null, {
		statusCode: 200,
		headers: {
			'Access-Control-Allow-Origin': `*`,
			'Access-Control-Allow-Headers': `Content-Type`,
		},
		body: JSON.stringify({
			success: true,
		}),
	})
}