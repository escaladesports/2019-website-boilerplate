import React from 'react'
import { Subscribe } from 'statable'
import formatUSD from '../functions/format-usd'
import priceState from '../../plugins/escalade-pricing/state'

// SSR price and repolls for new price live
export default class Price extends React.Component{
	render(){
		const { id, price } = this.props
		return (
			<Subscribe to={priceState}>
				{(prices) => (
					formatUSD((prices[id] ? prices[id].price : false) || price, true)
				)}
			</Subscribe>
		)
	}
}
