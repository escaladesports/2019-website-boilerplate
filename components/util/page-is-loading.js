import React from 'react'
import { routerAdd, routerRemove } from 'utils/next/router-events'
import settings from 'components/_settings'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loading: false }
		this.showLoader = this.showLoader.bind(this)
		this.routerStart = this.routerStart.bind(this)
		this.routerDone = this.routerDone.bind(this)
		this.clearTimeouts = this.clearTimeouts.bind(this)
	}
	componentWillMount() {
		this.clearTimeouts()
		routerAdd('onRouteChangeStart', this.routerStart)
		routerAdd('onRouteChangeComplete', this.routerDone)
		routerAdd('onRouteChangeError', this.routerDone)
	}
	componentDidMount() {
		this.clearTimeouts()
	}
	componentWillUnmount() {
		this.clearTimeouts()
		routerRemove('onRouteChangeStart', this.routerStart)
		routerRemove('onRouteChangeComplete', this.routerDone)
		routerRemove('onRouteChangeError', this.routerDone)
	}
	clearTimeouts() {
		clearTimeout(this.uiTimeout)
	}
	showLoader() {
		clearTimeout(this.uiTimeout)
		this.setState({ loading: true })
	}
	routerStart(url) {
		this.clearTimeouts()
		this.uiTimeout = setTimeout(this.showLoader.bind(this), 100)
	}
	routerDone() {
		this.clearTimeouts()
		this.setState({ loading: false })
	}
	render(){
		return (
			<div>
				{this.state.loading && this.props.children}
			</div>
		)
	}
}
