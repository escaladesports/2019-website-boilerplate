import React from 'react'
import Layout from 'components/_layout'

export default class Error extends React.Component {
	render () {
		return (
			<Layout>
				<div>
					<p>404: Page Not Found</p>
				</div>
				<style jsx>{`
					div {
						text-align: center;
						padding: 30vh 30px 40vh 30px;
					}
					p {
						font-weight: bold;
						font-size: 1.5rem;
					}
				`}</style>
			</Layout>
		)
	}
}
