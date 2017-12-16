import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import stores from '../../gatsby-mobx-config.js'

exports.replaceRouterComponent = ({ history }) => {
	return ({ children }) => (
		<Provider {...stores}>
			<Router history={history}>{children}</Router>
		</Provider>
	)
}