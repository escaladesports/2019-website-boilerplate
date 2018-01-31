import React from 'react'
import Link from 'gatsby-link'

export default class extends React.Component {
	render(){
		return (
			<header>
				<nav className='topNav'>
					<div><Link to='/'>Home</Link></div>
					<div><Link to='/test'>Page</Link></div>
					<div><Link to='/product/u2508'>Product page</Link></div>
					<div><Link to='/contact'>Contact</Link></div>
				</nav>
				<style jsx>{`
					div{
						display: inline-block;
					}
				`}</style>
				<style jsx global>{`
					.topNav{
						a{
							display: inline-block;
							padding: 10px 20px;
						}
					}
				`}</style>
			</header>
		)
	}
}
