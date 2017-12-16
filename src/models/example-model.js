import { observable } from 'mobx'

const steps = [
	'cart',
	'shipping',
	'billing',
	'confirmation',
	'complete'
]

export default class ExampleModel {
	@observable isOpen
	@observable step

	constructor() {
		this.isOpen = false
		this.step = steps[0]
	}
}