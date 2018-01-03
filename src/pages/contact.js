import React from 'react'
import Form from 'components/forms/form'
import Email from 'components/forms/email'
import Textarea from 'components/forms/textarea'
import Submit from 'components/forms/submit'

export default class Index extends React.Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		window.pageExitTime = 1000
	}
	render() {
		console.log('Contact page:', this.props.transition.status)
		return (
			<section className={this.props.transition.status}>
				<Form netlify="true" name='contact'>
					<Email name='email' label='Your email:' required />
					<Textarea name='message' label='Your message:' required />
					<Submit />
				</Form>
				<style jsx>{`
					section{
						opacity: 0;
						transition: opacity 1s;
						max-width: 400px;
						padding: 30px;
						margin: auto;
					}
					.entered{
						opacity: 1;
					}
				`}</style>
			</section>
		)
	}
}
