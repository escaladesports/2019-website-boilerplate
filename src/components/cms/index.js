/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "CMS" }]*/
import CMS from 'netlify-cms'
import { injectGlobal } from 'emotion'
import logo from '../../../static/backend-logo.png'

injectGlobal({
	color: `red`,
	'.e4hp3ji1 svg': {
		display: `none !important`,
	},
	'.e4hp3ji1': {
		background: `url('${logo}') no-repeat center center !important`,
		backgroundSize: `contain !important`,
	},
	'.e4hp3ji2': {
		color: `transparent !important`,
		'&:after': {
			content: `"Sign In"`,
			textAlign: `center`,
			color: `#fff`,
			position: `absolute`,
			left: 0,
			right: 0,
		},
	},
})