import React from 'react'
import { css } from 'emotion'
import Link from 'gatsby-link'

export default class Footer extends React.Component{
	render(){
		return (
			<footer className={footerStyles}>
				<Link to='/privacy-policy'>Privacy Policy</Link>
			</footer>
		)
	}
}

const footerStyles = css({
	padding: 30,
})