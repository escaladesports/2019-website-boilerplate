import React from 'react'
import { render } from 'react-dom'
import waitForElement from 'wait-for-element'

let header
export default async function injectButton(Component){
	if(!header){
		header = await waitForElement(`#nc-root header`, 60 * 60 * 1000)
	}
	const navUl = header.querySelector(`nav ul`)
	const li = navUl.querySelector(`li:last-of-type`)
	const buttonClasses = li.querySelector(`a, button`).className
	const iconClasses = li.querySelector(`span`).className
	const newLi = document.createElement(`li`)
	navUl.appendChild(newLi)


	render(
		<Component buttonClasses={buttonClasses} iconClasses={iconClasses} />,
		newLi
	)

}