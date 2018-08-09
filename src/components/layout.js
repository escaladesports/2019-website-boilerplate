import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { injectGlobal } from 'emotion'
import RouteDelayed from '../../plugins/route-delayed-animation'
import globalStyles from '../styles/global'
import { title } from '../../site-config'
import Header from '../components/header'
import Footer from '../components/footer'
import RouteDelayedAnimation from '../components/route-delayed-animation'

injectGlobal(globalStyles)

export default class Layout extends React.Component{
	render(){
		return(
			<Fragment>
				<Helmet>
					<html lang='en' />
					<title>{title}</title>
				</Helmet>
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