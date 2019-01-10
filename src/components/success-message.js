import React from 'react'
import { css } from '@emotion/core'
import { successColor, lightSuccessColor } from '../styles/colors'

export default class SuccessMessage extends React.Component{
	render(){
		return (
			<div css={styles.box}>
				{this.props.children}
			</div>
		)
	}
}

const styles = {
	box: css`
		border: 1px solid ${successColor};
		background-color: ${lightSuccessColor};
		padding: 10px 15px;
		margin-bottom: 30px;
	`,
}