import React from 'react'
import buttonMixin from 'styles/mixins/button'
import Name from 'components/inputs/name'
import Email from 'components/inputs/email'
import Textarea from 'components/inputs/textarea'
import Phone from 'components/inputs/phone'
import Zip from 'components/inputs/zip'
import Input from 'components/inputs/input'

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
				<Phone parent={this} required={false} />
				<Zip parent={this} required={false} />
				<Input type='select' label='Subject' name='subject' required={false}>
					<option>General</option>
					<option>Customer Service</option>
					<option>Warranty Claim</option>
				</Input>
				<Textarea parent={this} />
				<Input type='checkbox' label='Toggle' name='toggle' required={false} />
				<button disabled={!this.canSubmit()} className={buttonMixin}>
					Submit
				</button>
			</>
		)
	}
}