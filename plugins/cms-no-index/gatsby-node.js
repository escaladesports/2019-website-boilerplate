const { resolve } = require(`path`)
const { readFile, outputFile } = require(`fs-extra`)

exports.onPostBuild = async () => {
	const path = resolve(`public/admin/index.html`)
	try{
		let str = await readFile(path, `utf8`)
		str = str.replace(
			`<meta charset="UTF-8">`,
			`<meta name="robots" content="noindex" /><meta charset="UTF-8">`)
		await outputFile(path, str)
		console.log(`Post processed CMS file`)
	}
	catch (err) {
		console.log(`Failed to post process CMS`)
	}
}