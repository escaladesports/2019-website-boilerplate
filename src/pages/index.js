import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'

export default class HomePage extends React.Component {
	render() {
		return (
			<Fragment>
				<Helmet>
					<title>{this.props.data.site.siteMetadata.title}</title>
				</Helmet>
				<section>
					<div>Home Page</div>
				</section>
				<style jsx>{`
					@import 'src/css';
				`}</style>
			</Fragment>
		)
	}
}

export const query = graphql`
	query HomePageQuery{
		site {
			siteMetadata {
				title
			}
		}
	}
`
