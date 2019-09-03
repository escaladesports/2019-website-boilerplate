import auth from './auth'
import setSession from './set-session'

export default function handleAuthentication() {
	if (typeof window === `undefined`) return
	auth.parseHash(setSession())
}