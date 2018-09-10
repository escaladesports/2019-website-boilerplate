const patchIdentity = require(`./netlify-identity`)

async function patch(){
	await patchIdentity()
}

patch()