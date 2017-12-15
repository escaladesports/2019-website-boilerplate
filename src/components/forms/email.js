import React from 'react'
import validate from 'is-email'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = { error: false }
		this.handleBlur = this.handleBlur.bind(this)
	}
	handleBlur(e){
		if(!e.target.value){
			if(this.props.required){
				this.setState({
					error: 'This field is required.'
				})
			}
		}
		else if(!validate(e.target.value)){
			this.setState({
				error: 'Please enter a valid email.'
			})
		}
		else{
			this.setState({ error: false })
		}
	}
	render(){
		const errorClass = this.state.error ? 'error' : '';
		const requiredClass = this.props.required ? 'required' : '';

		return (
			<label className={ errorClass + ' ' + requiredClass }>
				<span className="labelText">{ this.props.label }</span>
				<input type='email' onBlur={this.handleBlur} required={this.props.required ? 'required' : ''} name={this.props.name} />
				<div className="msg">{this.state.error}</div>
				<style jsx>{`
					label{
						cursor: pointer;
						margin-bottom: 20px;
						display: block;
					}
					input{
						display: block;
						outline: 0;
						border: 1px solid #ccc;
						padding: 5px 10px;
						width: 100%;
						font-size: 1em;
						height: 40px;
						margin-top: 7px;
						&:active, &:focus{
							border: 1px solid #000;
						}
					}
					.msg{
						margin-top: 5px;
						display: none;
						font-size: .8em;
					}
					.error{
						color: #f00;
						& input{
							border: 1px solid red;
							background-color: rgba(255, 0, 0, .1);
						}
						& .msg{
							display: block;
						}
					}
					.required {
						& .labelText:after {
							content: '*';
							color: red;
						}
					}
				`}</style>
			</label>
		)
	}
}
