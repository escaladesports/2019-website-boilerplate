const cache = {}
export default function (id) {
	if(cache[id]) return cache[id]
	let post = Object.assign({}, require(`../../json/posts/${id}`))
	cache[id] = post
	return post
}
