import React from 'react'
import moment from 'moment'

export default class extends React.Component {
	render() {
		let props = this.props
		let render = true
		let from = props.from || props.start || props.starts || false
		let to = props.to || props.end || props.ends || false
		let now = new Date()
		now = now.getTime()

		if(from){
			if (now < moment(from, props.format).valueOf()){
				render = false
			}
		}
		if(to){
			if (now >= moment(to, props.format).valueOf()){
				render = false
			}
		}

		return (
			<div>
				{render && this.props.children}
			</div>
		)
	}
}