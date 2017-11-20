import React from 'react'
import { initGA } from 'utils/next/analytics'
import fastclick from 'react-fastclick'
import Head from 'next/head'
import createTitle from 'utils/next/create-page-title'
import createDescription from 'utils/next/create-page-description'
import clientTimeoutError from 'utils/next/client-timeout-error'
import NoSSR from 'react-no-ssr'
import PageLoadBar from 'components/page-load-animation'
import { initStock } from 'utils/product/set-stock'
import { initPrice } from 'utils/product/set-price'
import jsonToEnv from 'utils/next/json-to-env'

fastclick()

export default class Layout extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		initGA()
		clientTimeoutError()
		initStock()
		initPrice()
		jsonToEnv()
	}
	render() {
		return (
			<div>
				<Head>
					<title>{createTitle('Website Title', 'Website description', this.props.title)}</title>
					<meta content={createDescription('Website description', this.props.description)} name='description' />
					<link rel='icon' type='image/png' href='/static/img/w_32/favicon.png' />
				</Head>
				{this.props.children}
				<NoSSR>
					<PageLoadBar />
				</NoSSR>
			</div>
		)
	}
}
