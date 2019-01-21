const crypto = require(`crypto`)
const Cloudinary = require(`cloudinary`)

const correctHash = `b4ad47fb4e25c7bf5f92a20089f9db59bc302313`

function hashSignature(str) {
	return crypto.createHash(`sha256`)
		.update(str)
		.digest(`hex`)
}


const hash = hashSignature(`public_id=sample_image&timestamp=1315060510abcd`)
console.log(`Crypto`, hash)
if (hash == correctHash){
	console.log(`Crypto passed!`)
}
else{
	console.log(`Crypto failed.`)
}


const cloudinaryHash = Cloudinary.utils.api_sign_request({
	public_id: `sample_image`,
	timestamp: `1315060510`,
}, `abcd`)
console.log(`Cloudinary`, cloudinaryHash)
if (cloudinaryHash == correctHash) {
	console.log(`Cloudinary passed!`)
}
else {
	console.log(`Cloudinary failed.`)
}