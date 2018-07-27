import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import identity from 'netlify-identity-widget'
import { injectGlobal } from 'emotion'
import '../styles/cms.css'

injectGlobal({
	'.nc-githubAuthenticationPage-logo svg': {
		display: `none !important`,
	},
})

window.netlifyIdentity = identity
identity.init({
	logo: false,
})
identity.on(`login`, () => {
	window.location.reload(false)
})