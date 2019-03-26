export default function cloudinaryTransform(src, transformations){
	let path = src.split(`/`)
	const name = path.pop()
	path = path.join(`/`)
	return `${path}/${transformations}/${name}`
}