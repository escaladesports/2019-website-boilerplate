import React from 'react'

export default class extends React.Component {
	render() {
		let props = this.props
		let render = true
		let from = props.from || props.start || props.starts || false
		let to = props.to || props.end || props.ends || false
		let now = new Date()
		now = now.getTime()

		if(from){
			if(typeof from === 'string'){
				from = new Date(from)
				from = from.getTime()
			}
			if (now < from){
				render = false
			}
		}
		if (to) {
			if (typeof to === 'string') {
				to = new Date(to)
				to = to.getTime()
			}
			if (now >= to){
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