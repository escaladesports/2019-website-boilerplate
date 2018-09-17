/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "CMS" }]*/
import CMS, { init } from 'netlify-cms'
import netlifyIdentityWidget from 'netlify-identity-widget'
import { injectGlobal } from 'emotion'
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
		console.log(`Found window.netlifyIdentity`)
		clearInterval(identityInterval)
		identity.on(`login`, () => {
			console.log(`Identity login`)
			window.location.reload(false)
		})
	}
})

init()