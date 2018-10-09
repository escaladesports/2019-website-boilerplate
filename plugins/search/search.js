import lunr from 'lunr'
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

	query = query.split(` `)
	let results = index.query(function(q){
		// Exact matches should have the highest boost
		q.term(query, { boost: 100 })

		// Prefix matches should be boosted slightly
		q.term(query, {
			boost: 10,
			usePipeline: false,
			wildcard: lunr.Query.wildcard.TRAILING,
		})

		// Finally, try a fuzzy search, without any boost
		// q.term(query, {
		// 	boost: 1,
		// 	usePipeline: false,
		// 	editDistance: 3,
		// })
	})

	let suggestions = results.map(v => {
		return Object.keys(v.matchData.metadata)
	})
	if (suggestions.length){
		suggestions = suggestions.reduce((a, b) => {
			return a.concat(b)
		})
		suggestions = suggestions.filter((v, i, a) => {
			return a.indexOf(v) === i
		})
	}

	results = results.map(({ ref }) => {
		return store[ref]
	})

	if(curId !== id) return

	searchState.setState({
		loading: false,
		results,
	})
}