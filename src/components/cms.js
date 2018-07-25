import CMS from 'netlify-cms/src'
import 'netlify-cms/dist/cms.css'
import identity from 'netlify-identity-widget'
import '../css/cms.css'

window.netlifyIdentity = identity
identity.init({
	logo: false,
})
identity.on(`login`, () => {
	window.location.reload(false)
})