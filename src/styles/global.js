import { mixins } from './config'

export default {
	html: {
		height: `100%`,
		boxSizing: `border-box`,
	},
	'*, *:before, *:after': {
		boxSizing: `inherit`,
	},
	body: {
		position: `relative`,
		minHeight: `100%`,
		margin: 0,
		fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
		textRendering: `optimizeLegibility`,
		fontSize: 18,
	},
	'html, body': {
		'-webkit-tap-highlight-color': `rgba(0, 0, 0, 0)`,
	},
	a: {
		...mixins.link,
	},
	p: {
		lineHeight: `28px`,
	},
	img: {
		maxWidth: `100%`,
	},
	h1: {
		...mixins.h1,
	},
	h2: {
		...mixins.h2,
	},
	h3: {
		...mixins.h3,
	},
	li: {
		lineHeight: `1.3em`,
		marginBottom: 4,
	},
	'::selection': {
		...mixins.highlight,
	},
}