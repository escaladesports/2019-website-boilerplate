import React from 'react'
import Img from 'gatsby-image'
import { observer, inject } from 'mobx-react'
import MobXExample from 'components/mobx-example'

import { OpenCart, AddToCart, CartQty, CartHasQty } from 'react-snipcart'

export default class Index extends React.Component {
	render() {
		return (
			<div>Home page!</div>
		)
	}
}
