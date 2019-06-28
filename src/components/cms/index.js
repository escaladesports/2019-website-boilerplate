import React from 'react'
import CMS, { init } from 'netlify-cms'
import netlifyIdentityWidget from 'netlify-identity-widget'
import { injectGlobal } from 'emotion'
import waitForElement from 'wait-for-element'
import { render } from 'react-dom'
import { CurrencyControl, CurrencyPreview } from './currency'
import { HTMLControl, HTMLPreview } from './html'

injectGlobal`
	#nc-root > div > section{
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
		> span:nth-of-type(2){
			opacity: 0;
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
CMS.registerWidget(`html`, HTMLControl, HTMLPreview)

init()

!async function injectApp(){
	const header = await waitForElement(`#nc-root header`, 60 * 60 * 1000)
	const navUl = header.querySelector(`nav ul`)
	const li = navUl.querySelector(`li:last-of-type`)
	console.log(li)
	const buttonClasses = li.querySelector(`a, button`).className
	const iconClasses = li.querySelector(`span`).className

	const newLi = document.createElement(`li`)
	navUl.appendChild(newLi)
	render(
		<button className={buttonClasses}>
			<span className={iconClasses}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.027 4.045h13.975a3 3 0 0 1 3 3v9.99a3 3 0 0 1-3 3H5.027a3 3 0 0 1-3-3v-9.99a3 3 0 0 1 3-3zm2.874 8.48l-4.114 5.504h16.455l-5.485-6.88-4.073 5.105-2.783-3.73zM9.493 10a1.507 1.507 0 1 0 0-3.014 1.507 1.507 0 0 0 0 3.014z"></path></svg>
			</span>
			Users
		</button>,
		newLi,
	)
}()