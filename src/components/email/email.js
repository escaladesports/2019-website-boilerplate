import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import '../../styles/global.css'

export default class EmailLayout extends React.Component {
	render() {
		return (
			<Fragment>
				<Helmet>
					<html lang='en' dir='ltr' xmlns='http://www.w3.org/1999/xhtml' />
					<body
						bgColor='#fff'
						width='100%'
						style={{
							width: `100%`,
							margin: 0,
							padding: 0,
							WebkitTextSizeAdjust: `100%`,
							MsTextSizeAdjust: `100%`,
						}}
					/>
				</Helmet>
				{this.props.children}
			</Fragment>
		)
	}
}