import React from 'react'
import Link from 'gatsby-link'
import { css } from 'emotion'

export default class Header extends React.Component{
	render(){
		return (
			<header className={styles}>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/contact'>Contact</Link></li>
				</ul>
			</header>
		)
	}
}

const styles = css`
	ul{
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	li{
		display: inline-block;
	}
	a{
		text-decoration: none;
		padding: 10px;
		display: inline-block;
	}
`