import React, { Fragment } from 'react'
import { injectGlobal } from 'emotion'
import RouteDelayed from '../../plugins/route-delayed-animation'
import globalStyles from '../styles/global'
import Header from './header'
import Footer from './footer'
import RouteDelayedAnimation from '../components/route-delayed-animation'

injectGlobal(globalStyles)

export default class Layout extends React.Component{
	render(){
		return(
			<Fragment>
				<Header />
				<RouteDelayed>
					<RouteDelayedAnimation />
				</RouteDelayed>
				<main>{ this.props.children }</main>
				<Footer />
			</Fragment>
		)
	}
}