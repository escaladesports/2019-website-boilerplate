export default function sanityToExcerpt(blocks, limit = 20) {
	const str = sanityToString(blocks)
	const arr = str.split(/\s+/g).splice(0, limit)
	return arr.join(` `)
}
function sanityToString(blocks, str = []) {
	if (blocks.text) {
		str.push(blocks.text)
	}
	else if (typeof blocks === `object`) {
		if (Array.isArray(blocks)) {
			blocks.forEach(block => {
				sanityToString(block, str)
			})
		}
		else {
			for (let i in blocks) {
				sanityToString(blocks[i], str)
			}
		}
	}
	return str.join(` `)
}