import auth from './auth'
import isAuthenticated from './is-authenticated'
import setSession from './set-session'

export default function silentAuth(setState) {
	console.log(`silentAuth`)
	if (typeof window === `undefined`) return
	if (!isAuthenticated()) {
		console.log(`Is not logged in`)
		setState({ loadingUser: false })
		return
	}

	console.log(`Checking existing session`)
	auth.checkSession({}, setSession(setState, () => {
		setState({ loadingUser: false })
	}))
}