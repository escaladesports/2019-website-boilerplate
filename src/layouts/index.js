import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

class Layout extends React.Component{
	render(){
		const { data, children } = this.props
		return(
			<Fragment>
				<Helmet>
					<meta charSet="utf-8" />
					<title>{data.site.siteMetadata.title }</title>
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

export default Layout

export const query = graphql`
	query LayoutQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`
