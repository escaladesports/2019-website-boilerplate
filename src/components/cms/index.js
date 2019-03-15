import CMS, { init } from 'netlify-cms'
import netlifyIdentityWidget from 'netlify-identity-widget'
import { injectGlobal } from 'emotion'
import { CurrencyControl, CurrencyPreview } from './currency'
// import cloudinary from './cloudinary-media-library'
import logo from '../../../static/backend-logo.png'

injectGlobal`
	#nc-root > div > section{
		> span{
			background: url(${logo}) no-repeat center center !important;
			background-size: contain !important;
			> svg{
				display: none !important;
			}
		}
		> button{
			color: transparent !important;
			:after{
				content: "Sign In";
				text-align: center;
				color: #fff;
				position: absolute;
				left: 0;
				right: 0;
			}
		}
	}
`

window.netlifyIdentity = netlifyIdentityWidget
netlifyIdentityWidget.init({
	logo: false,
})

// Fix for CMS not loading on login
const identityInterval = setInterval(() => {
	const identity = window.netlifyIdentity
	if(identity){
		clearInterval(identityInterval)
		identity.on(`login`, () => {
			console.log(`Identity login`)
			window.location.reload(false)
		})
	}
}, 1)

CMS.registerWidget(`currency`, CurrencyControl, CurrencyPreview)
// CMS.registerMediaLibrary(cloudinary)

init()