import ReactGA from 'react-ga'
import env from 'json/env.json'
import { routerAdd } from 'utils/next/router-events'

export const initGA = () => {
	if (!window.GA_INITIALIZED) {
		window.GA_INITIALIZED = true
		if (env.GOOGLE_ANALYTICS_ID) {
			ReactGA.initialize(env.GOOGLE_ANALYTICS_ID)
			logPageView()
			routerAdd('onRouteChangeComplete', logPageView)
		}
	}
}

export const logPageView = () => {
	if (!env.GOOGLE_ANALYTICS_ID) return
	ReactGA.set({ page: window.location.pathname })
	ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
	if (!env.GOOGLE_ANALYTICS_ID) return
	if(category && action){
		ReactGA.event({ category, action })
	}
}

export const logException = (description = '', fatal = false) => {
	if (!env.GOOGLE_ANALYTICS_ID) return
	if (description) {
		ReactGA.exception({ description, fatal })
	}
}
