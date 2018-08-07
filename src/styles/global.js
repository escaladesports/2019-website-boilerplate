import {
	white,
	primaryColor,
	primaryActiveColor,
} from './colors'
import {
	primaryFont,
	secondaryFont,
} from './fonts'

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
		margin: 0,
		fontFamily: `"${secondaryFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
		textRendering: `optimizeLegibility`,
		fontSize: `18px`,
		height: `200vh`,
	},
	'html, body': {
		'-webkit-tap-highlight-color': `rgba(0, 0, 0, 0)`,
	},
	a: {
		color: primaryColor,
		'&:focus, &:hover, &:active': {
			textDecoration: `none`,
			color: primaryActiveColor,
		},
	},
	p: {
		lineHeight: `28px`,
	},
	img: {
		maxWidth: `100%`,
	},
	'h1, h2, h3': {
		fontFamily: primaryFont,
		textTransform: `uppercase`,
	},
	li: {
		lineHeight: `1.3em`,
		marginBottom: `4px`,
	},
	'::selection': {
		color: white,
		backgroundColor: primaryColor,
	},
}