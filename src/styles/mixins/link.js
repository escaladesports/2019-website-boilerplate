import { css } from 'emotion'
import colors from '../colors'
const {
	primaryColor,
	primaryActiveColor,
} = colors

export default css({
	color: primaryColor,
	textDecoration: `none`,
	'&:focus, &:hover, &:active': {
		textDecoration: `underline`,
		color: primaryActiveColor,
	},
})