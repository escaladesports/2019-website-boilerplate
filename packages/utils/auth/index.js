import React, { useReducer, createContext, useContext } from 'react'
import navigateToPrevious from './navigate-to-previous'
import isAuthenticated from './is-authenticated'
import login from './login'
import logout from './logout'
import changePassword from './change-password'
import handleAuthentication from './handle-authentication'
import silentAuth from './silent-auth'
import setMetadata from './set-metadata'
import patchUser from './patch-user'

const initialState = {
	user: false,
	loadingUser: true,
	meta: {},
	loadingMeta: true,
}

const dispatch = (oldState, newState) => ({
	...oldState,
	...newState,
})

const Context = createContext()

export function WithAuth({ children }) {
	const [state, setState] = useReducer(dispatch, initialState)
	const {
		accessToken,
		user: {
			email,
		} = {},
	} = state || {}
	return (
		<Context.Provider value={{
			...state,
			navigateToPrevious,
			isAuthenticated,
			login,
			logout: logout.bind(null, setState),
			changePassword: changePassword.bind(null, email),
			handleAuthentication: handleAuthentication.bind(null, setState),
			silentAuth: silentAuth.bind(null, setState),
			setMetadata: setMetadata.bind(null, setState, accessToken),
			patchUser: patchUser.bind(null, setState, accessToken),
		}}>
			{children}
		</Context.Provider>
	)
}

export function useAuth() {
	return useContext(Context)
}