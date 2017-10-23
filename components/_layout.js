import React from 'react'
import { initGA } from 'utils/next/analytics'
import fastclick from 'react-fastclick'
import Head from 'next/head'
import createTitle from 'utils/next/create-page-title'
import createDescription from 'utils/next/create-page-description'
import clientTimeoutError from 'utils/next/client-timeout-error'
import zygoteRefresh from 'utils/next/zygote-refresh'
import NoSSR from 'react-no-ssr'
import PageLoadBar from 'components/page-load-animation'
import { initStock } from 'utils/product/set-stock'
import { initPrice } from 'utils/product/set-price'

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
	}
	render() {
		return (
			<div>
				<Head>
					<title>{createTitle('Website Title', 'Website description', this.props.title)}</title>
					<meta content={createDescription('Website description', this.props.description)} name='description' />
				</Head>
				{this.props.children}
				<NoSSR>
					<PageLoadBar />
				</NoSSR>
			</div>
		)
	}
}
