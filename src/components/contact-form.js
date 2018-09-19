import React from 'react'
import buttonMixin from 'styles/mixins/button'
import Input from 'components/inputs/input'
import Email from 'components/inputs/email'

export default class ContactForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	canSubmit(){
		return (
			this.state.email &&
			this.state.name
		)
	}
	render(){
		return (
			<>
				<Email
					label='Email'
					name='email'
					parent={this}
				/>
				<Input
					label='Name'
					name='name'
					required={false}
					parent={this}
				/>

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