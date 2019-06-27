import auth0 from 'auth0-js'
import { navigate } from 'gatsby'
import fetch from 'isomorphic-fetch'
import authState from '../state/auth'

const isBrowser = typeof window !== `undefined`
const { localStorage } = global

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
	return localStorage.getItem(`isLoggedIn`) === `true`
}

export function login(){
	if (!isBrowser) return
	const { pathname, hash } = document.location
	localStorage.setItem(`previousLocation`, `${pathname}${hash}`)
	auth.authorize()
}

export function logout() {
	authState.setState({ user: false })
	localStorage.setItem(`isLoggedIn`, false)
	auth.logout()
}

function setSession(cb = noop){
	return (err, authResult) => {
		if (err) {
			console.error(err)
			cb()
			return
		}
		if (authResult && authResult.accessToken && authResult.idToken) {
			const { idToken: accessToken, idTokenPayload: user } = authResult
			authState.setState({ user, accessToken })
			localStorage.setItem(`isLoggedIn`, true)
			const previousLocation = localStorage.getItem(`previousLocation`)
			if (previousLocation) {
				localStorage.setItem(`previousLocation`, ``)
				// If you need the hash:
				// document.location = previousLocation
				navigate(previousLocation)
			}
			fetchMetadata(accessToken)
			cb(authResult)
		}
	}
}

export function handleAuthentication(){
	if (!isBrowser) return
	auth.parseHash(setSession())
}

export function silentAuth(callback = noop){
	if (!isAuthenticated()) {
		authState.setState({ loadingUser: false })
		return callback()
	}
	auth.checkSession({}, setSession(() => {
		authState.setState({ loadingUser: false })
		callback()
	}))
}

export async function fetchMetadata(accessToken){
	authState.setState({ loadingMeta: true })
	try{
		const req = await fetch(`/.netlify/functions/get-auth0-metadata`, {
			method: `POST`,
			headers: {
				authorization: accessToken,
			},
		})
		const { metadata } = await req.json()
		authState.setState({
			loadingMeta: false,
			meta: metadata,
		})
	}
	catch(err){
		console.error(err)
	}
}

export async function setMetadata(meta){
	authState.setState({ loadingMeta: true })
	try {
		const req = await fetch(`/.netlify/functions/set-auth0-metadata`, {
			method: `POST`,
			headers: {
				authorization: authState.state.accessToken,
			},
			body: JSON.stringify(meta),
		})
		const res = await req.json()
		authState.setState({
			loadingMeta: false,
			meta: res.meta,
		})
	}
	catch (err) {
		console.error(err)
	}
}