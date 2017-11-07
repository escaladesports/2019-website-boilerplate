import React from 'react'
import ReactDOM from 'react-dom'
import styles from 'components/_settings'
import fetch from 'isomorphic-fetch'
import Error from 'components/messages/error'
import Info from 'components/messages/info'
import Loader from 'components/loader'
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

				// Don't process form if already working on previous request or done
				if(this.state.className === 'processing') {
					e.preventDefault()
					return
				}

				// Show loading
				this.setState({
					results: <Loader />,
					className: 'processing'
				})

				if (!this.props.google) {
					e.preventDefault()
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
							if (res.status !== 200) {
								console.log('Status error!')
								this.setState({
									results: <Error message='Your information was not sent. Please try again later.' />,
									className: ''
								})
							}
							else {
								console.log('Success!')
								this.setState({
									results: <Info message={this.props.successMessage || 'Thank you for contacting us! A representative will be in touch shortly.'} />
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
				}
			}, false)
		}
		if(this.props.google && this.iframe){

			form.addEventListener('submit', e => {
				// Show loading
				this.setState({
					results: <Loader />,
					className: 'processing'
				})
			})
			this.iframe.addEventListener('load', () => {
				this.setState({
					results: <Info message={this.props.successMessage || 'Thank you for contacting us! A representative will be in touch shortly.'} />
				})
			})
		}
	}
	render(){
		let action
		if(this.props.action){
			action = this.props.action
		}
		else if(this.props.google){
			action = `https://docs.google.com/forms/d/e/${this.props.google}/formResponse`
		}
		else{
			action = 'thank-you'
		}
		return (
			<div>
				<form
					method='post'
					name={ this.props.name }
					action={ action }
					target={this.props.google && 'hidden_iframe' }
					data-netlify={ this.props.netlify }
					className={ this.state.className }
					onSubmit={ this.props.onSubmit }
					data-netlify-honeypot={this.props.netlify && 'bf'}
					>
					{this.props.netlify &&
						<input type='hidden' name='form-name' value={this.props.name} />
					}
					{ this.state.results }
					<div className='formContents'>
						{this.props.netlify &&
							<input name='bf' />
						}
						{ this.props.children }
					</div>
				</form>
				{this.props.google &&
					<iframe name='hidden_iframe' ref={el => this.iframe = el} />
				}
				<style jsx>{`
					.processing{
						.formContents{
							display: none;
						}
					}
					input[name='bf']{
						display: none;
					}
					iframe{
						display: none;
					}
				`}</style>
			</div>
		)
	}
}
