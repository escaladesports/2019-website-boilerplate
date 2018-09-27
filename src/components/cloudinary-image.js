import React from 'react'
import { Image } from 'cloudinary-react'
import { cloudinaryName } from '../../site-config'

export default class CloudinaryImage extends React.Component{
	static defaultProps = {
		cloudName: cloudinaryName,
		width: `auto`,
		crop: `scale`,
		responsive: true,
	}
	render(){
		const {
			id,
			...props
		} = this.props
		return (
			<Image
				publicId={id}
				{...props}
			/>
		)
	}
}