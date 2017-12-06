const fetch = require('isomorphic-fetch')
const crypto = require('crypto')

const url = 'https://ynwagjvee2.execute-api.us-east-1.amazonaws.com/production/handler'
const regStart = /[_a-zA-Z]/

exports.sourceNodes = async ({ boundActionCreators }, { ids }) => {
	const { createNode } = boundActionCreators

	const data = await Promise.all(ids.map(id => {
		return fetch(`${url}?id=${id}`)
			.then(res => res.json())
			.then(res => {
				res = formatSalsifyObject(res)
				console.log(res)
				return {
					id: `${id} >>> SalsifyContent`,
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
		if(i.charAt(0).match(regStart)){
			newObj[i] = obj[i]
		}
		else{
			newObj[`_${i}`] = obj[i]
		}
	}
	return newObj
}