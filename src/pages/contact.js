import React from 'react'
import Form from 'components/forms/form'
import Input from 'components/forms/input'
import Textarea from 'components/forms/textarea'
import Submit from 'components/forms/submit'

export default class Index extends React.Component {
	render() {
		return (
			<div>
				<Form netlify="true" name='contact'>
					<Input name='email' label='Your email:' required />
					<Textarea name='message' label='Your message:' required />
					<Submit />
				</Form>
				<style jsx>{`
					div{
						max-width: 400px;
						padding: 30px;
						margin: auto;
					}
				`}</style>
			</div>
		)
	}
}
