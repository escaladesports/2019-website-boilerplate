import React from 'react'
import { css } from '@emotion/core'
import { Item } from 'react-html-email'

export default class TestComponent extends React.Component{
	render(){
		return (
			<Item>
				<p css={styles.test}>TEST</p>
			</Item>
		)
	}
}

const styles = {
	test: css`
		color: red;
	`,
}