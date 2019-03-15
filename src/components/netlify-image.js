import React from 'react'
import { css } from '@emotion/core'
import Responsive from './responsive-image'

export default class NetlifyImage extends React.Component{
	static defaultProps = {
		resize: `fit`,
	}
	render(){
		const {
			src,
			resize,
			ratio,
			width,
			height,
			...props
		} = this.props
		return (
			<Responsive ratio={ratio} width={width} height={height}>
				{(w, h) => (
					<img
						src={`${src}?nf_resize=${resize}&w=${w}&h=${h}`}
						css={styles.img}
						{...props}
					/>
				)}
			</Responsive>
		)
	}
}

const styles = {
	img: css`
		width: 100%;
	`,
}