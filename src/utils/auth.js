import auth0 from 'auth0-js'
import { navigate } from 'gatsby'
import authState from '../state/auth'

const isBrowser = typeof window !== `undefined`

const auth = isBrowser ? new auth0.WebAuth({
	domain: process.env.GATSBY_AUTH0_DOMAIN,
	clientID: process.env.GATSBY_AUTH0_CLIENTID,
	redirectUri: process.env.GATSBY_AUTH0_CALLBACK,
	responseType: `token id_token`,
	scope: `openid profile email`,
}) : {}

function noop(){}

export function isAuthenticated(){
	if (!isBrowser) return
	return global.localStorage.getItem(`isLoggedIn`) === `true`
}

export function login(){
	if (!isBrowser) return
	auth.authorize()
}

function setSession(cb = noop, redirect = false){
	return (err, authResult) => {
		if (err) {
			console.error(err)
			cb()
			return
		}
		if (authResult && authResult.accessToken && authResult.idToken) {
			console.log(`authResult`, authResult)
			const { idToken: accessToken, idTokenPayload: user } = authResult
			console.log(`authResult`, authResult)
			authState.setState({ user, accessToken })
			global.localStorage.setItem(`isLoggedIn`, true)
			if (redirect) {
				navigate(`/account`)
			}
			cb(authResult)
		}
	}
}

export function handleAuthentication(){
	if (!isBrowser) return
	auth.parseHash(setSession(noop, true))
}

export function silentAuth(callback = noop){
	if (!isAuthenticated()) {
		authState.setState({ loaded: true })
		return callback()
	}
	auth.checkSession({}, setSession(() => {
		authState.setState({ loaded: true })
		callback()
	}))
}

export function logout(){
	authState.setState({ user: false })
	global.localStorage.setItem(`isLoggedIn`, false)
	auth.logout()
}