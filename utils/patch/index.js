const {
	readFile,
	outputFile,
} = require(`fs-extra`)

const cwd = process.cwd()
const path = `${cwd}/node_modules/netlify-identity-widget/build/netlify-identity-widget.js`
const find = `logo:t.modal.logo`
const replace = `logo:false`

async function patch(){
	try{
		let str = await readFile(path, `utf8`)
		if(str.indexOf(find) === -1){
			throw new Error(`Can't find string to replace`)
		}
		str = str.replace(find, replace)
		await outputFile(path, str)
		console.log(`Patched identity widget`)
	}
	catch (err) {
		console.log(`Failed to patch identity widget`)
		console.log(err)
	}
}

patch()