import React from 'react'
import { observer, inject } from 'mobx-react'

@inject("ExampleStore")
@observer
export default class extends React.Component {
	constructor(props) {
		super(props)
		this.changeA = this.changeA.bind(this)
		this.changeB = this.changeB.bind(this)
	}
	changeA(e) {
		this.props.ExampleStore.a = Number(e.target.value)
	}
	changeB(e) {
		this.props.ExampleStore.b = Number(e.target.value)
	}
	render() {
		return (
			<div>
				<input onChange={this.changeA} />
				<input onChange={this.changeB} />
				<div>{this.props.ExampleStore.total}</div>
			</div>
		)
	}
}