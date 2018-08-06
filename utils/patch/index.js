const {
	readFile,
	outputFile,
} = require(`fs-extra`)

const cwd = process.cwd()
const path = `${cwd}/node_modules/netlify-identity-widget/build/netlify-identity.js`

async function patch(){
	try{
		let str = await readFile(path, `utf8`)
		str = str.replace(`logo:t.modal.logo`, `logo:false`)
		await outputFile(path, str)
		console.log(`Patched identity widget`)
	}
	catch (err) {
		console.log(`Failed to patch identity widget`)
		console.log(err)
	}
}

patch()