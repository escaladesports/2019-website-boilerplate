import React from 'react'
import fetch from 'isomorphic-fetch'
import Form from './form'
import Name from './inputs/name'
import Email from './inputs/email'
import Textarea from './inputs/textarea'
import buttonMixin from '../styles/mixins/button'

export default class CommentForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		this.submit = this.submit.bind(this)
	}
	async submit(){
		console.log(this.state)
		const res = await fetch(`/.netlify/functions/comment`, {
			method: `post`,
			body: JSON.stringify(this.state),
		})
		const data = await res.text()
		console.log(data)
	}
	render(){
		return (
			<Form
				form={<>
					<div>
						<Name name='name' parent={this} />
					</div>
					<div>
						<Email name='email' parent={this} />
					</div>
					<div>
						<Textarea name='comment' parent={this} />
					</div>
					<div>
						<button className={buttonMixin}>Submit</button>
					</div>
				</>}
				error={msg => (
					<div>{msg}</div>
				)}
				success={(
					<div>Thank you for your comment! Your comment will appear once approved.</div>
				)}
				onSubmit={this.submit}
			/>
		)
	}
}