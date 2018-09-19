import React from 'react'
import buttonMixin from 'styles/mixins/button'
import Name from 'components/inputs/name'
import Email from 'components/inputs/email'
import Textarea from 'components/inputs/textarea'
import Phone from 'components/inputs/phone'

export default class ContactForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	canSubmit(){
		const required = [
			`email`,
			`name`,
			`message`,
		]
		for(let i = required.length; i--;){
			if(!this.state[required[i]]){
				return false
			}
		}
		return true
	}
	render(){
		return (
			<>
				<Name parent={this} />
				<Email parent={this} />
				<Phone parent={this} />
				<Textarea parent={this} />

				<div>
					<button
						disabled={!this.canSubmit()}
						className={buttonMixin}
					>
						Submit
					</button>
				</div>
			</>
		)
	}
}