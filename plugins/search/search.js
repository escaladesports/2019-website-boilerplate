import fetchIndex from './fetch-index'
import searchState from './state'
import indexStore from './index-store'

let id = 0

export default async function search(query){
	searchState.setState({ query })
	if (!query) {
		searchState.setState({ results: [] })
		return
	}

	id++
	const curId = id

	searchState.setState({ loading: true })

	await fetchIndex()

	const { index, store } = indexStore

	const results = index.search(query)
		.map(({ ref }) => {
			return store[ref]
		})

	if(curId !== id) return

	searchState.setState({
		loading: false,
		results,
	})
}