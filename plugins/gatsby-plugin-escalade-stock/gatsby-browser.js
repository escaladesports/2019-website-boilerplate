import { prefetchStock } from 'escalade-react-stock'


exports.onInitialClientRender = (a, options) => {
	options = {
		site: process.env.GATSBY_ESCALADE_SITE_ID,
		...options
	}
	prefetchStock(options)
}