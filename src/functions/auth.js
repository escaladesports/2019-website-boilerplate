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

const tokens = {
	accessToken: false,
	idToken: false,
	expiresAt: false,
}

function noop(){}

export function isAuthenticated(){
	if (!isBrowser) return
	return global.localStorage.getItem(`isLoggedIn`) === `true`
}

export function login(){
	if (!isBrowser) return
	auth.authorize()
}

function setSession(cb = noop, silent = false){
	return (err, authResult) => {
		if (err) {
			console.error(err)
			cb()
			return
		}
		if (authResult && authResult.accessToken && authResult.idToken) {
			let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
			tokens.accessToken = authResult.accessToken
			tokens.idToken = authResult.idToken
			tokens.expiresAt = expiresAt
			authState.setState({ user: authResult.idTokenPayload })
			global.localStorage.setItem(`isLoggedIn`, true)
			if (!silent) {
				navigate(`/account`)
			}
			cb()
		}
	}
}

export function handleAuthentication(){
	if (!isBrowser) return
	auth.parseHash(setSession())
}

export function silentAuth(callback = noop){
	if (!isAuthenticated()) return callback()
	auth.checkSession({}, setSession(callback, true))
}

export function logout(){
	authState.setState({ user: false })
	global.localStorage.setItem(`isLoggedIn`, false)
	auth.logout()
}