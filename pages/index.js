import React from 'react'
import Layout from 'components/_layout'
import Link from 'next/link'
import DealerLocator from 'components/dealer-locator/index'
import Loader from 'components/loader'

const fontColor = 'red'

export default class extends React.Component {
	render(){
		return(
			<Layout>
				<div>
					<Link href='/product?id=kz1500-red' as='/product/kz1500-red' prefetch>
						<a>Product</a>
					</Link>
				</div>
				<div>
					<Link href='/category?id=paddles' as='/category/paddles' prefetch>
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
				<div>
					<Link href='/post?id=hello-world' as='/post/hello-world'>
						<a>Post</a>
					</Link>
				</div>
				<div>
					<Link href='/tag?id=meta' as='/tag/meta'>
						<a>Tag</a>
					</Link>
				</div>
				<style jsx>{`
					a{
						color: ${fontColor};
					}
				`}</style>
			</Layout>
		)
	}
}
