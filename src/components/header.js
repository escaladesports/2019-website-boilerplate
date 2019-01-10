import React from 'react'
import Link from 'gatsby-link'
import { css } from '@emotion/core'
import Close from '@material-ui/icons/Close'
import { primaryColor } from '../styles/colors'

export default class Header extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			open: false,
		}
		this.toggle = this.toggle.bind(this)
	}
	toggle(){
		this.setState({ open: !this.state.open })
	}
	render(){
		const { open } = this.state
		return (
			<header css={styles.header}>
				<button
					type='button'
					onClick={this.toggle}
					css={styles.menuButton}
				>
					menu
				</button>
				<nav
					css={[
						styles.nav,
						open && styles.navOpen,
					]}
					onClick={this.toggle}
				>
					<Close css={styles.close} />
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/blog'>Blog</Link></li>
						<li><Link to='/about'>About</Link></li>
						<li><Link to='/grid'>Grid</Link></li>
						<li><Link to='/pickleball'>Category</Link></li>
						<li><Link to='/search'>Search</Link></li>
						<li><Link to='/contact'>Contact</Link></li>
					</ul>
				</nav>
				{this.state.open && (
					<style>{`body{overflow:hidden}`}</style>
				)}
			</header>
		)
	}
}

const breakpoint = 800

const styles = {
	header: css`
		padding: 30px;
	`,
	menuButton: css`
		appearance: none;
		background: transparent;
		outline: none;
		border: none;
		cursor: pointer;
		font-size: 1em;
		:hover, :active{
			text-decoration: underline;
		}
		@media(min-width: ${breakpoint}px){
			display: none;
		}
	`,
	nav: css`
		background-color: rgba(0, 0, 0, .8);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		text-align: center;
		align-items: center;
		justify-content: center;
		display: none;
		overflow: auto;
		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
		a {
			padding: 0 10px;
			color: #fff;
		}
		@media(min-width: ${breakpoint}px){
			position: relative;
			background-color: transparent;
			display: block;
			text-align: left;
			overflow: hidden;
			z-index: 1;
			li{
				display: inline-block;
			}
			a{
				color: ${primaryColor};
			}
		}
	`,
	navOpen: css`
		display: flex;
	`,
	close: css`
		position: absolute;
		top: 10px;
		right: 10px;
		fill: #fff !important;
		cursor: pointer;
		width: 34px;
		height: 34px;
		@media(min-width: ${breakpoint}px){
			display: none;
		}
	`,
}