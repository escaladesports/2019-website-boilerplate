import { State } from 'statable'

module.exports = new State({
	open: false,
}, null, {
	localStorage: `escaladeDocsNav`,
})