import React from 'react'
import { css } from 'emotion'

export default class Footer extends React.Component{
	render(){
		return (
			<footer className={footerStyles}>Footer</footer>
		)
	}
}

const footerStyles = css({
	padding: 30,
})