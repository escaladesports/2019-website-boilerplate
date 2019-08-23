import React from 'react'
import { silentAuth } from 'utils/auth'

class SessionCheck extends React.Component {
	componentDidMount() {
		silentAuth()
	}
	render() {
		return this.props.children
	}
}

export const wrapRootElement = ({ element }) => {
	return <SessionCheck>{element}</SessionCheck>
}