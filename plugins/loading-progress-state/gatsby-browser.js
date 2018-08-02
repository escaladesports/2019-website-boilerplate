import state from './state'

exports.onRouteUpdateDelayed = () => {
	state.setState({
		delayed: true,
	})
}

exports.onRouteUpdate = () => {
	state.setState({
		delayed: false,
	})
}