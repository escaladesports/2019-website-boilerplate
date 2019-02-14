import React from 'react'
import { css } from '@emotion/core'

export default class TestComponent extends React.Component{
	render(){
		return (
			<p css={styles.test}>TEST</p>
		)
	}
}

const styles = {
	test: css`
		color: red;
	`,
}