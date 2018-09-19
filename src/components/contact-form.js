import React from 'react'
import buttonMixin from 'styles/mixins/button'
import Name from 'components/inputs/name'
import Email from 'components/inputs/email'
import Textarea from 'components/inputs/textarea'

export default class ContactForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	canSubmit(){
		return (
			this.state.email &&
			this.state.name &&
			this.state.message
		)
	}
	render(){
		return (
			<>
				<Email parent={this} />
				<Name parent={this} />
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