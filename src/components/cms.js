import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import identity from 'netlify-identity-widget'
import '../styles/cms.css'

window.netlifyIdentity = identity
identity.init({
	logo: false,
})
identity.on(`login`, () => {
	window.location.reload(false)
})