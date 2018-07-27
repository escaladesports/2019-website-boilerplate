import color from 'color'

const colors = {
	primaryColor: `#52b8fc`,
	secondaryColor: `#333`,
	white: `#fff`,
}
colors.primaryActiveColor = color(colors.primary).lighten(.5)

export default colors