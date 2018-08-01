exports.handler = async (event, context, callback) => {
	const { message } = event.queryStringParameters
	const body = {
		message,
		response: `Response!`,
	}
	console.log(body)
	callback(null, {
		statusCode: 200,
		headers: {
			'Content-Type': `application/json`,
		},
		body: JSON.stringify(body),
	})
}