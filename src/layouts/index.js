import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { title } from '../../meta'

export default class Layout extends React.Component{
	render(){
		const { data, children } = this.props
		return(
			<Fragment>
				<Helmet>
					<meta charSet="utf-8" />
					<title>{title}</title>
				</Helmet>
				<main>
					{children()}
				</main>
				<style jsx global>{`
					@import 'src/css/global';
				`}</style>
			</Fragment>
		)
	}
}