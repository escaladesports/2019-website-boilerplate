import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { injectGlobal, css } from 'emotion'
import globalStyles from '../styles/global'
import { title } from '../../site-config'

injectGlobal(globalStyles)

export default class Layout extends React.Component{
	render(){
		return(
			<Fragment>
				<Helmet>
					<meta charSet="utf-8" />
					<title>{title}</title>
				</Helmet>
				<main>
					{this.props.children()}
				</main>
			</Fragment>
		)
	}
}