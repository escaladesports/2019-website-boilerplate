import React from 'react'
import { css } from '@emotion/core'

export default class ZipInput extends React.Component{
	render(){
		return (
			<div css={styles.zipContainer}>
				<input type='text' />
			</div>
		)
	}
}

const styles = {
	zipContainer: css`
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 400;
	`,
}