import React from 'react'
import { css } from 'emotion'
import { Item } from 'react-html-email'

export default class TestComponent extends React.Component{
	render(){
		return (
			<Item>
				<p className={styles.test}>TEST</p>
			</Item>
		)
	}
}

const styles = {
	test: css`
		color: red;
	`,
}