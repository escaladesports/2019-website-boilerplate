import { State } from 'statable'

const searchState = new State({
	results: [],
	loading: false,
	query: ``,
})

export default searchState