import React, { Fragment } from 'react'
import { css } from 'emotion'
import { Helmet } from 'react-helmet'
import RouteDelayed from '../../plugins/route-delayed-animation'
import Header from './header'
import Footer from './footer'
import RouteDelayedAnimation from './route-delayed-animation'
import {
	white,
	primaryColor,
	primaryActiveColor,
} from '../styles/colors'
import {
	primaryFont,
	secondaryFont,
} from '../styles/fonts'

export default class Layout extends React.Component{
	render(){
		return(
			<Fragment>
				<Helmet>
					<html className={htmlStyles} />
					<body className={bodyStyles} />
				</Helmet>
				<div className={layoutStyles}>
					<Header />
					<div className={contentStyles}>
						<main>{this.props.children}</main>
					</div>
					<Footer />
				</div>
				<RouteDelayed>
					<RouteDelayedAnimation />
				</RouteDelayed>
			</Fragment>
		)
	}
}

const htmlStyles = css({
	height: `100%`,
	boxSizing: `border-box`,
	'-webkit-tap-highlight-color': `rgba(0, 0, 0, 0)`,
	'*, *:before, *:after': {
		boxSizing: `inherit`,
	},
})

const bodyStyles = css({
	position: `relative`,
	margin: 0,
	fontFamily: `"${secondaryFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
	textRendering: `optimizeLegibility`,
	fontSize: `18px`,
	'-webkit-tap-highlight-color': `rgba(0, 0, 0, 0)`,
	a: {
		color: primaryColor,
		'&:focus, &:hover, &:active': {
			textDecoration: `none`,
			color: primaryActiveColor,
		},
	},
	p: {
		lineHeight: `28px`,
	},
	img: {
		maxWidth: `100%`,
	},
	'h1, h2, h3': {
		fontFamily: primaryFont,
		textTransform: `uppercase`,
	},
	li: {
		lineHeight: `1.3em`,
		marginBottom: `4px`,
	},
	'::selection': {
		color: white,
		backgroundColor: primaryColor,
	},
})

const layoutStyles = css({
	minHeight: `100vh`,
	display: `flex`,
	flexDirection: `column`,
})

const contentStyles = css({
	margin: `0 auto`,
	padding: `0 30px`,
	maxWidth: 960,
	width: `100%`,
	flex: `1 0 auto`,
})