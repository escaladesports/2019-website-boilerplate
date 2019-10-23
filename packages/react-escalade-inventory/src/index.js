import React, { useReducer, createContext, useContext, useEffect } from 'react'
import fetchInventory from './fetch'

let polling = false

const dispatch = (_, state) => state

const Context = createContext()

// SSR price and repolls for new price live
export function WithInventory({ children }) {
	const [inventory, setInventory] = useReducer(dispatch, {})
	return (
		<Context.Provider value={[inventory, setInventory]}>
			{children}
		</Context.Provider>
	)

}

export function useInventory(id, ids, endpoint) {

	// If fetching all inventory
	if(!ids && typeof id === `object`){
		ids = id
		id = null
	}

	const [inventory, setInventory] = useContext(Context)

	// Poll live data
	useEffect(() => {
		if (typeof window !== `undefined` && !polling && ids) {
			polling = true
			fetchInventory(ids, setInventory, endpoint)
		}
	})

	return [id ? inventory[id]?.stock : inventory, setInventory]
}