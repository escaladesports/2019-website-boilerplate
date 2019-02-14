import React from 'react'
import { Subscribe } from 'statable'
import stockState from '../../plugins/escalade-stock/state'

// SSR stock and repolls for changed stock live
export default class Stock extends React.Component{
	render(){
		const { id, stock, children } = this.props
		return (
			<Subscribe to={stockState}>
				{(clientStock) => {
					if (id in clientStock){
						return children(clientStock[id].stock)
					}
					return children(stock)
				}}
			</Subscribe>
		)
	}
}
