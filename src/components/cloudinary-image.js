import React from 'react'
import { Image } from 'cloudinary-react'
import Placeholder from './placeholder'
import { cloudinaryName } from '../../site-config'

export default class CloudinaryImage extends React.Component{
	static defaultProps = {
		cloudName: cloudinaryName,
		width: `auto`,
		crop: `pad`,
		responsive: true,
	}
	render(){
		const {
			id,
			ratio,
			...props
		} = this.props
		let aspectRatio
		if (ratio){
			aspectRatio = `${ratio[0]}:${ratio[1]}`
		}
		return (
			<Placeholder ratio={ratio}>
				<Image publicId={id} aspectRatio={aspectRatio} {...props} />
			</Placeholder>
		)
	}
}