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

	const newLi = document.createElement(`li`)
	navUl.appendChild(newLi)
	render(
		<button className={buttonClasses}>Users</button>,
		newLi,
	)
}()