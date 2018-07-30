const makeRelative = require(`./make-relative`)

exports.onCreateNode = async ({ node }, options) => {
	if (node.internal.type === `MarkdownRemark`) {
		const fm = node.frontmatter
		if(typeof fm === `object`){
			for(let i in fm){
				if(i === `_PARENT` || i === `parent`) continue
				fm[i] = await makeRelative(node.fileAbsolutePath, fm[i], options)
			}
		}
	}
}