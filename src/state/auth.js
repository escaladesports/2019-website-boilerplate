import { State } from 'statable'

const authState = new State({
	user: false,
	loadingUser: true,
	meta: {},
	loadingMeta: true,
})

export default authState