import { css } from 'emotion'
import colors from '../colors'
const {
	white,
	primaryColor,
	primaryActiveColor,
} = colors
import fonts from '../fonts'
const { primaryFont } = fonts

export default css({
	fontFamily: primaryFont,
	backgroundColor: primaryColor,
	color: white,
	cursor: `pointer`,
	borderRadius: 8,
	padding: `10px 30px`,
	fontSize: `1.1em`,
	textTransform: `uppercase`,
	border: 0,
	outline: 0,
	userSelect: `none`,
	'&:focus, &:hover, &:active': {
		backgroundColor: primaryActiveColor,
	},
	'&:active': {
		transform: `translate(0, 2px)`,
	},
})