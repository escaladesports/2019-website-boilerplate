import React, { Fragment } from 'react'
import { css, injectGlobal } from 'emotion'
import RouteDelayed from '../../plugins/route-delayed-animation'
import globalStyles from '../styles/global'
import Header from './header'
import Footer from './footer'
import RouteDelayedAnimation from './route-delayed-animation'

injectGlobal(globalStyles)

export default class Layout extends React.Component{
	render(){
		return(
			<Fragment>
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