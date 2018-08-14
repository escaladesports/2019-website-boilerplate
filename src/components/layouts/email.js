import React from 'react'
import { css } from 'emotion'
import { Helmet } from 'react-helmet'
import linkMixin from '../../styles/mixins/link'
import '../../styles/global.css'

export default class EmailLayout extends React.Component {
	render() {
		return (
			<div className={wrapper}>
				<Helmet>
					<html lang='en' dir='ltr' />
					<body bgColor='#fff' width='100%' />
				</Helmet>
				{this.props.children}
			</div>
		)
	}
}

const wrapper = css({
	maxWidth: 600,
	padding: 20,
	margin: `0 auto`,
	a: linkMixin,
})