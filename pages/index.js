import React from 'react'
import Layout from 'components/_layout'
import Link from 'next/link'
import DealerLocator from 'components/dealer-locator/index'
import Loader from 'components/loader'

export default class extends React.Component {
	render(){
		return(
			<Layout>
				<div>
					<Link href='/product?id=a6czl1015r' as='/product/a6czl1015r' prefetch>
						<a>Product</a>
					</Link>
				</div>
				<div>
					<Link href='/category?id=traditional' as='/category/traditional' prefetch>
						<a>Category</a>
					</Link>
				</div>
				<div>
					<Link href='/page?id=about' as='/about'>
						<a>About</a>
					</Link>
				</div>
				<div>
					<Link href='/contact?id=contact' as='/contact'>
						<a>Contact</a>
					</Link>
				</div>
				<style jsx>{`
					section{
						lost-utility: clearfix;
					}
				`}</style>
			</Layout>
		)
	}
}
