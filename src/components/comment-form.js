import React from 'react'
import Form from './form'
import Name from './inputs/name'
import Email from './inputs/email'
import Textarea from './inputs/textarea'
import buttonMixin from '../styles/mixins/button'

export default class CommentForm extends React.Component{
	render(){
		return (
			<Form
				onSubmit={data => console.log(data)}
				form={<>
					<div>
						<Name />
					</div>
					<div>
						<Email />
					</div>
					<div>
						<Textarea />
					</div>
					<div>
						<button className={buttonMixin}>Submit</button>
					</div>
				</>}
			/>
		)
	}
}