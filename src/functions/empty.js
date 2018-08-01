exports.handler = async (event, context, callback) => {
	const { message } = event.queryStringParameters
	callback(null, {
		headers: {
			'Content-Type': `application/json`,
		},
		body: JSON.stringify({
			message,
			response: `Response!`,
		}),
	})
}