import { prefetchStock } from 'escalade-react-stock'


exports.onInitialClientRender = (a, options = {}) => {
	prefetchStock(options)
}