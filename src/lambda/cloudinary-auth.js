

export function handler(_, context, callback){

	// const { nf_jwt } = parse(req.headers.cookie)
	// console.log(`jwt`, nf_jwt)

	// const auth = new GoTrue({
	// 	APIUrl: `${process.env.URL}/.netlify/identity`,
	// })

	// auth
	console.log(context)

	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}