import React from 'react'
import { css, cx } from 'emotion'

export default class Placeholder extends React.Component{
	render(){
		const { ratio, className, children, ...otherProps } = this.props
		const [ w, h ] = ratio
		return (
			<div
				className={cx(className, styles.outer)}
				style={{ paddingTop: `${(h / w) * 100}%` }}
				{...otherProps}
			>
				<div className={styles.inner}>
					{children}
				</div>
			</div>
		)
	}
}

const styles = {
	outer: css`
		position: relative;
		width: 100%;
		overflow: hidden;
		:before{
			display: block;
			content: '';
			width: 100%;
		}
	`,
	inner: css`
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	`,
}