import React from 'react'
import { css } from 'emotion'
import { errorColor, lightErrorColor } from '../styles/colors'

export default class ErrorMessage extends React.Component{
	render(){
		return (
			<div className={styles.box}>
				{this.props.children}
			</div>
		)
	}
}

const styles = {
	box: css`
		border: 1px solid ${errorColor};
		background-color: ${lightErrorColor};
		padding: 10px 15px;
	`,
}