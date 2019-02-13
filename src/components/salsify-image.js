import React from 'react'
import Image from './cloudinary-image'

export default class SalsifyImage extends React.Component{
	static defaultProps = {
		secureDistribution: `images.salsify.com`,
		cloudName: `salsify`,
		privateCdn: true,
		secure: true,
	}
	render(){
		return (
			<Image {...this.props} />
		)
	}
}