import React from 'react'
import Link from 'gatsby-link'

export default class Header extends React.Component{
	render(){
		return (
			<header>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/contact'>Contact</Link></li>
				</ul>
			</header>
		)
	}
}