import React from 'react'
import Head from 'components/head'
import Header from 'components/header'
import Footer from 'components/footer'
import PageIsLoading from 'gatsby-page-is-loading'
import PageProgress from 'components/page-progress'
import NoSSR from 'react-no-ssr'

export default class Template extends React.Component {
	render() {
		return (
			<div>
				<Head />
				<Header />
				{this.props.children()}
				<Footer />
				<NoSSR>
					<PageIsLoading>
						<PageProgress />
					</PageIsLoading>
				</NoSSR>
				<style jsx global>{`
					html{
						height: 100%;
						box-sizing: border-box;
					}
					*, *:before, *:after{
						box-sizing: inherit;
					}
					body{
						position: relative;
						min-height: 100%;
						margin: 0;
						font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
						text-rendering: optimizeLegibility;
					}
					html, body{
						-webkit-tap-highlight-color: rgba(0,0,0,0);
					}
					img{
						max-width: 100%;
					}
					::selection{
						background-color: #333;
						color: #fff;
					}
				`}</style>
			</div>
		)
	}
}