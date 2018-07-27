import color from 'color'


const colors = {
	primary: `#52b8fc`,
	secondary: `#333`,
	white: `#fff`,
}
colors.primaryActive = color(colors.primary).lighten(.5)

const fonts = {
	primary: `oswald`,
	secondary: `open sans`,
}

const mixins = {
	highlight: {
		color: colors.white,
		backgroundColor: colors.primary,
	},
	h1: {
		fontFamily: fonts.primary,
		textTransform: `uppercase`,
	},
	h2: {
		fontFamily: fonts.primary,
		textTransform: `uppercase`,
	},
	h3: {
		fontFamily: fonts.primary,
		textTransform: `uppercase`,
	},
	link: {
		color: colors.primary,
		'&:focus, &:hover, &:active': {
			textDecoration: `none`,
			color: colors.primaryActive,
		},
	},
	button: {
		fontFamily: fonts.primary,
		backgroundColor: colors.primary,
		color: colors.white,
		cursor: `pointer`,
		borderRadius: 8,
		padding: [10, 30],
		fontSize: `1.1em`,
		textTransform: `uppercase`,
		border: 0,
		outline: 0,
		userSelect: `none`,
		'&:focus, &: hover, &: active': {
			backgroundColor: colors.primaryActive,
		},
		'&:active': {
			transform: `translate(0, 2px)`,
		},
	},
}


export default {
	colors,
	fonts,
	mixins,
}