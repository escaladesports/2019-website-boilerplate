'use strict'
const { join } = require(`path`)

module.exports = function(){
	return function custom(tree) {
		tree.walk(node => {
			if (typeof node === `object`) {
				if (!node.attrs) {
					node.attrs = {}
				}
				let src = node.attrs.src
				switch(node.tag){
				case `html`:
					Object.assign(node.attrs, {
						'xmlns:v': `urn:schemas-microsoft-com:vml`,
						'xmlns:o': `urn:schemas-microsoft-com:office:office`,
					})
					break
				case `head`:
					node.content.push(`
							<!--[if gte mso 9]>
							<xml>
								<o:OfficeDocumentSettings>
								<o:AllowPNG />
								<o:PixelsPerInch>96</o:PixelsPerInch>
								</o:OfficeDocumentSettings>
							</xml>
							<![endif]-->
						`)
					break
				case `img`:
					if (process.env.URL && src.indexOf(`://`) === -1) {
						let url = process.env.URL.split(`://`)
						src = join(url[1], src)
						src = `${url[0]}://${src}`
						node.attrs.src = src
					}
					break
				}
			}
			return node
		})
		return tree
	}
}