exports.sourceNodes = async ({ boundActionCreators }) => {
	const { createNode } = boundActionCreators
	// Create nodes here, generally by downloading data
	// from a remote API.
	const data = await fetch('https://ynwagjvee2.execute-api.us-east-1.amazonaws.com/production/handler')

	// Process data into nodes.
	data.forEach(datum => createNode(processDatum(datum)))

	// We're done, return.
	return
}