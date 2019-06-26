import { State } from 'statable'

const authState = new State({
	user: false,
	loaded: false,
	meta: {},
	loadingMeta: true,
})

export default authState