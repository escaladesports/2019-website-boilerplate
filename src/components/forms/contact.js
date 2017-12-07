import React from 'react'
import Input from './input'
import Email from './email'
import Textarea from './textarea'
import Button from './button'
import serialize from 'form-serialize'
import fetch from 'isomorphic-fetch'
import Error from '../messages/error'
import Info from '../messages/info'
import Loader from '../loader'

export default class extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(e){
		e.preventDefault()

		// Don't process form if already working on previous request or done
		if(this.state.className === 'processing') return

		// Show loading
		this.setState({
			results: '<Loader />',
			className: 'processing'
		})

		const data = serialize(e.target)
		const action = e.target.getAttribute('action')


		fetch(action, {
				method: 'POST',
				body: data,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest'
				}
			})
			.then(res => {
				if(res.status !== 200){
					this.setState({
						results: <Error message='Your information was not sent. Please try again later.' />,
						className: ''
					})
				}
				else{
					this.setState({
						results: <Info message='Thank you for contacting us! We will respond as soon as possible.' />
					})
				}
			})
			.catch(() => {
				this.setState({
					results: <Error message='Your information was not sent. Please try again later.' />,
					className: ''
				})
			})
	}
	render(){
		return (
			<form name='contact' data-netlify='true' onSubmit={this.handleSubmit} action='/contact-submit' className={this.state.className}>
				{ this.state.results }
				<div>
					<Input label='Your Name:' name='name' required />
					<Email label='Your Email:' name='email' required />
					<Textarea label='Message:' name='message' required />
					<Button type='submit' />
				</div>
				<style jsx>{`
					.processing{
						& div{
							display: none;
						}
					}
				`}</style>
			</form>
		)
	}
}
