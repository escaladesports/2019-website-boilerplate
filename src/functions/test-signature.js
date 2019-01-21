const crypto = require(`crypto`)
const cloudinary = require(`cloudinary`)

function hashSignature(obj, key) {
	return cloudinary.utils.api_sign_request(obj, key)
	// return crypto.createHash(`sha1`)
	// 	.update(str)
	// 	.digest(`hex`)
}
function decrypt(text) {
	var decipher = crypto.createDecipher(`sha1`)
	var dec = decipher.update(text, `hex`, `utf8`)
	dec += decipher.final(`utf8`)
	return dec
}


// const hash = hashSignature(`cloud_name=my_company&timestamp=1518601863&username=jane@mycompany.comabcd`)
const hash = hashSignature({
	cloud_name: `my_company`,
	timestamp: 1518601863,
	username: `jane@mycompany.com`,
}, `abcd`)
console.log(`hash`, hash)
if (hash == `764F932E9F6516637384D948E71B8DA6144F776083DDB66907BA4F25C70CB5C2`){
	console.log(`Test passed!`)
}
else{
	console.log(`Test failed.`)
}


console.log(
	`Decrypted`,
	decrypt(`764F932E9F6516637384D948E71B8DA6144F776083DDB66907BA4F25C70CB5C2`)
)