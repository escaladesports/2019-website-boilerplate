import React, { useReducer, createContext, useContext } from 'react'

const initialState = 0
const dispatch = (_, state) => state

const Context = createContext()

export function WithCounter({ children }) {
	console.log(`WithCounter`)
	const [store, setState] = useReducer(dispatch, initialState)
	return (
		<Context.Provider value={[store, setState]}>
			{children}
		</Context.Provider>
	)
}

export function useCounter(){
	console.log(`useCounter`)
	return useContext(Context)
}