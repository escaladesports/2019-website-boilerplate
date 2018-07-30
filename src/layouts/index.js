import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { injectGlobal } from 'emotion'
import globalStyles from '../styles/global'
import { title } from '../../site-config'
import Header from '../components/header'
import Footer from '../components/footer'

injectGlobal(globalStyles)

export default class Layout extends React.Component{
	render(){
		return(
			<Fragment>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<Header />
				<main>
					{this.props.children()}
				</main>
				<Footer />
			</Fragment>
		)
	}
}