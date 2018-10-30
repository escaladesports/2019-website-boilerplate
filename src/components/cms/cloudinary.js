import React from 'react'
import Script from 'react-load-script'
import { buttons, components } from 'netlify-cms-ui-default'
import { css } from 'emotion'
import Img from '../cloudinary-image'

class CloudinaryControl extends React.Component{
	constructor(props){
		super(props)
		this.openWidget = this.openWidget.bind(this)
	}
	openWidget(){
		const { cloudinary } = window
		if (cloudinary){
			cloudinary.openUploadWidget({
				cloudName: `escalade-sports`,
				uploadPreset: `boilerplate`,
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
		return (
			<div>
				<div>{this.props.value}</div>
				<button
					onClick={this.openWidget}
					className={styles.button}
				>
					{!!this.props.value && `Replace`}
					{!this.props.value && `Upload`}
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