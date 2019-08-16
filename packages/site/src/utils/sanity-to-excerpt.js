import excerpt from './excerpt'

export default function sanityToExcerpt(blocks, limit) {
	const str = sanityToString(blocks)
	return excerpt(str, limit)
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