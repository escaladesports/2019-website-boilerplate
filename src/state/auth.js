import { State } from 'statable'

const authState = new State({
	user: false,
	loaded: false,
})

export default authState