import React from 'react'
import { css } from '@emotion/core'
import { primaryColor } from '../styles/colors'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class LoadingAnimation extends React.Component{
	render(){
		return (
			<div css={styles.container}>
				<CircularProgress style={{ color: primaryColor }} />
			</div>
		)
	}
}

const styles = {
	container: css`
		text-align: center;
	`,
}