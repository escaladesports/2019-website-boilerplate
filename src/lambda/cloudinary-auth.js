export function handler({ body }, _, callback){

	try {
		console.log(JSON.parse(body))
	}
	catch(err){
		console.error(err)
	}



	callback(null, {
		statusCode: 200,
		body: JSON.stringify({
			success: true,
		}),
	})
}