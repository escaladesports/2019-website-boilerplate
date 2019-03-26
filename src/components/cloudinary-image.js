import React from 'react'
import { css } from '@emotion/core'
import Responsive from './responsive-image'
import transform from '../functions/cloudinary-transform'

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
		return (
			<Responsive {...props}>
				{(w, h) => {
					return (
						<img
							src={transform(src, `w_${w},h_${h},${transformations}`)}
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