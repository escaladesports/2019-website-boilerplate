const fetch = require('isomorphic-fetch')
const crypto = require('crypto')
const glob = require('globby')
const camelCase = require('camelcase')

const url = 'https://app.salsify.com/api/v1/products/'
const regStart = /[_a-zA-Z]/

exports.sourceNodes = async ({ boundActionCreators }, { ids, markdownPath, apiKey }) => {

	if (!apiKey){
		console.log('No API key provided')
		return
	}

	const { createNode } = boundActionCreators

	if(markdownPath){
		ids = await getIdsFromMarkdown(markdownPath)
	}

	const data = await Promise.all(ids.map(id => {
		return fetch(`${url}${id}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${apiKey}`
				}
			})
			.then(res => res.json())
			.then(res => {
				res = formatSalsifyObject(res)
				return {
					id: id,
					parent: null,
					children: [],
					... res,
					internal: {
						type: 'SalsifyContent',
						contentDigest: crypto
							.createHash('md5')
							.update(JSON.stringify(res))
							.digest('hex')
					}
				}
			})
	}))

	data.forEach(datum => createNode(datum))

	return
}

function formatSalsifyObject(obj) {
	const newObj = {}
	for(let i in obj){
		let camelKey = camelCase(i)
		if (camelKey.charAt(0).match(regStart)){
			newObj[camelKey] = obj[i]
		}
		else{
			newObj[`_${camelKey}`] = obj[i]
		}
	}
	return newObj
}

function getIdsFromMarkdown(path){
	path = `${path}/**/*.md`
	return glob(path)
		.then(paths => console.log('paths: ', paths))
		.then(() => [])
		.catch(console.error)
}