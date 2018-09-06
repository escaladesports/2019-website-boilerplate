import state from './state'

export function onRouteUpdateDelayed(){
	state.setState({
		delayed: true,
	})
}

export function onRouteUpdate(){
	state.setState({
		delayed: false,
	})
}