const cache = {}
export default function (id) {
	if(cache[id]) return cache[id]
	let tag = require(`../../json/post-tags/${id}`).slice(0)
	cache[id] = tag
	return tag
}
