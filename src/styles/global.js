import {
	white,
	primaryColor,
	primaryActiveColor,
} from './colors'
import {
	primaryFont,
	secondaryFont,
} from './fonts'

export default `
	html {
		height: 100%;
		box-sizing: border-box;
	},
	*, *:before, *:after {
		box-sizing: inherit;
	}
	body {
		position: relative;
		margin: 0;
		font-family: "${secondaryFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
		text-rendering: optimizeLegibility;
		font-size: 18px;
	}
	html, body {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	a {
		color: ${primaryColor};
		&:focus, &:hover, &:active {
			text-decoration: none;
			color: ${primaryActiveColor};
		}
	}
	p {
		line-height: 28px;
	}
	img {
		max-width: 100%;
	}
	h1, h2, h3 {
		font-family: ${primaryFont};
		text-transform: uppercase;
	}
	li {
		line-height: 1.3em;
		margin-bottom: 4px;
	}
	::selection: {
		color: ${white};
		background-color: ${primaryColor};
	}
`