import { State } from 'statable'

const authState = new State({
	status: `loading`,
	user: false,
})

export default authState