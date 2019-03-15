import React from 'react'
import { css } from '@emotion/core'
import Responsive from './responsive-image'

export default class NetlifyImage extends React.Component {
	static defaultProps = {
		transformations: `c_pad`,
	}
	render() {
		const {
			src,
			alt,
			transformations,
			...props
		} = this.props
		let path = src.split(`/`)
		const name = path.pop()
		path = path.join(`/`)
		return (
			<Responsive {...props}>
				{(w, h) => {
					return (
						<img
							src={`${path}/w_${w},h_${h},${transformations}/${name}`}
							css={styles.img}
							alt={alt}
						/>
					)
				}}
			</Responsive>
		)
	}
}

const styles = {
	img: css`
		width: 100%;
	`,
}