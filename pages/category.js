import React from 'react'
import Layout from 'components/_layout'
import ProductBlock from 'components/product/block'
import getCategory from 'utils/product/get-category'

export default class extends React.Component {
	constructor(props){
		super(props)
	}
	static async getInitialProps(req) {
		let product = getCategory(req.query.id)
		return {
			id: req.query.id,
			product: product
		}
	}
	render(){
		return(
			<Layout>
				<h1>{this.props.id}</h1>
				{this.props.product.map((prod, key) => {
					return <ProductBlock key={key} product={prod} />
				})}
			</Layout>
		)
	}
}
