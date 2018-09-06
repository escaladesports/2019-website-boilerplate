import {
	primaryColor,
	primaryActiveColor,
} from '../colors'

export default {
	color: primaryColor,
	textDecoration: `none`,
	'&:focus, &:hover, &:active': {
		textDecoration: `underline`,
		color: primaryActiveColor,
	},
}