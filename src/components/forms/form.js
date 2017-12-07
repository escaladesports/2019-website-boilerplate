import React from 'react'
import ReactDOM from 'react-dom'
import fetch from 'isomorphic-fetch'
import Error from '..//messages/error'
import Info from '../messages/info'
import Loader from '../loader'
import serialize from 'form-serialize'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	componentDidMount(){
		const form = ReactDOM.findDOMNode(this)
		if(this.props.netlify){
			form.addEventListener('submit', e => {
				e.preventDefault()

				// Don't process form if already working on previous request or done
				if(this.state.className === 'processing') return

				// Show loading
				this.setState({
					results: <Loader />,
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
							console.log('Status error!')
							this.setState({
								results: <Error message='Your information was not sent. Please try again later.' />,
								className: ''
							})
						}
						else{
							console.log('Success!')
							this.setState({
								results: <Info message={ this.props.successMessage || 'Thank you for contacting us! A representative will be in touch shortly.' } />
							})
						}
					})
					.catch(() => {
						console.log('catch!')
						this.setState({
							results: <Error message='Your information was not sent. Please try again later.' />,
							className: ''
						})
					})
			}, false)
		}
	}
	render(){
		return (
			<form
				name={ this.props.name }
				action={ this.props.action || 'thank-you' }
				data-netlify={ this.props.netlify }
				className={ this.state.className }
				onSubmit={ this.props.onSubmit }
				data-netlify-honeypot='bf'
				>
				{ this.state.results }
				<div className='formContents'>
					<input name='bf' />
					{ this.props.children }
				</div>
				<style jsx>{`
					.processing{
						& .formContents{
							display: none;
						}
					}
					input[name='bf']{
						display: none;
					}
				`}</style>
			</form>
		)
	}
}
