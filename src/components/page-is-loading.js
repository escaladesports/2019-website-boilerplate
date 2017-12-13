import React from 'react'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = { loading: false }
		this.showLoader = this.showLoader.bind(this)
		this.hideLoader = this.hideLoader.bind(this)
	}
	componentWillMount() {
		window.___emitter.on('onDelayedLoadPageResources', this.showLoader)
		window.___emitter.on('onPostLoadPageResources', this.hideLoader)
	}
	componentWillUnmount() {
		window.___emitter.off('onDelayedLoadPageResources', this.showLoader)
		window.___emitter.off('onPostLoadPageResources', this.hideLoader)
	}
	showLoader() {
		this.setState({ loading: true })
	}
	hideLoader() {
		this.setState({ loading: false })
	}
	render() {
		return (
			<div>
				{this.state.loading && this.props.children}
			</div>
		)
	}
}