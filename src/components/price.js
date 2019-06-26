import React from 'react'
import { Subscribe } from 'statable'
import formatUSD from '../utils/format-usd'
import priceState from '../../plugins/escalade-pricing/state'

// SSR price and repolls for new price live
export default class Price extends React.Component{
	render(){
		const { id, price, children } = this.props
		return (
			<Subscribe to={priceState}>
				{(prices) => {
					const latestPrice = (prices[id] ? prices[id].price : false) || price
					if(typeof children === `function`){
						return children(latestPrice)
					}
					return formatUSD(latestPrice, true)
				}}
			</Subscribe>
		)
	}
}
