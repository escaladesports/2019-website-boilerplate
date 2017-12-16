import { observable, computed } from 'mobx'

export default class ExampleModel {
	@observable a = 0
	@observable b = 0

	@computed get total(){
		return this.a + this.b
	}
}