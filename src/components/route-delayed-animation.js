import React from 'react'
import { css, keyframes } from '@emotion/core'
import { primaryColor } from '../styles/colors'

export default class RouteDelayedAnimation extends React.Component {
	render() {
		return (
			<div css={styles.outer}>
				<div css={styles.inner} />
			</div>
		)
	}
}

const animation = keyframes({
	from: {
		transform: `translateX(-100%)`,
	},
	to: {
		transform: `translateX(0%)`,
	},
})

const styles = {
	outer: css`
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		overflow: hidden;
		height: 3px;
	`,
	inner: css`
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		animation: ${animation} 4s linear infinite;
		background: ${primaryColor};
	`,
}