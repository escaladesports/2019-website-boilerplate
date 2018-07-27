import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import identity from 'netlify-identity-widget'
import { injectGlobal } from 'emotion'

injectGlobal({
	'.nc-githubAuthenticationPage-logo svg': {
		display: `none !important`,
	},
	'.nc-githubAuthenticationPage-logo': {
		background: `url('../img/logo.png') no-repeat center center !important`,
		backgroundSize: `contain !important`,
	},
	'.nc-githubAuthenticationPage-button': {
		color: `transparent !important`,
	},
	'.nc-githubAuthenticationPage-button::after': {
		content: `Sign In`,
		textAlign: `center`,
		color: `#fff`,
		position: `absolute`,
		left: 0,
		right: 0,
	},
})

window.netlifyIdentity = identity
identity.init({
	logo: false,
})
identity.on(`login`, () => {
	window.location.reload(false)
})