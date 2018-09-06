import color from 'color'

export const
	primaryColor = `#00dd00`,
	secondaryColor = `#333`,
	white = `#fff`,
	primaryActiveColor = color(primaryColor)
		.lighten(.5)
		.rgb()
		.string()