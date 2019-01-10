import React from 'react'
import Script from 'react-load-script'
import { buttons, components } from 'netlify-cms-ui-default'
import { css } from '@emotion/core'
import Img from '../cloudinary-image'
import { cloudinaryName, cloudinaryUploadPreset } from '../../../site-config'

class CloudinaryControl extends React.Component{
	constructor(props){
		super(props)
		this.openWidget = this.openWidget.bind(this)
	}
	openWidget(){
		const { cloudinary } = window
		if (cloudinary){
			cloudinary.openUploadWidget({
				cloudName: cloudinaryName,
				uploadPreset: cloudinaryUploadPreset,
			}, (err, { event, info: { public_id }}) => {
				if(err){
					console.error(err)
				}
				if(event === `success`){
					this.props.onChange(public_id)
				}
			})
		}
	}
	render(){
		const { value } = this.props
		return (
			<div>
				<div>{value}</div>
				<button
					onClick={this.openWidget}
					css={styles.button}
				>
					{!!value && `Replace`}
					{!value && `Upload`}
				</button>
				<Script url='https://widget.cloudinary.com/v2.0/global/all.js' />
			</div>
		)
	}
}

class CloudinaryPreview extends React.Component{
	render(){
		return (
			<div>
				<Img id={this.props.value} />
			</div>
		)
	}
}

const styles = {
	button: css`
		${buttons.button};
		${components.badge};
	`,
}

export { CloudinaryControl, CloudinaryPreview }