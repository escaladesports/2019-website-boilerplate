import React from 'react'

export default class extends React.Component {
	constructor(props){
		super(props)
		this.state = { error: false }
		this.handleBlur = this.handleBlur.bind(this)
	}
	handleBlur(e){
		if(!e.target.value && this.props.required){
			this.setState({
				error: 'This field is required.'
			})
		}
		else{
			this.setState({ error: false })
		}
	}
	render(){
		return (
			<label className={ this.state.error ? 'error' : '' }>
				{ this.props.label }
				<select onBlur={this.handleBlur} required={this.props.required ? 'required' : ''} name={this.props.name}>
					<option></option>
					{ this.props.children }
				</select>
				<div className="msg">{this.state.error}</div>
				<style jsx>{`
					label{
						cursor: pointer;
						margin-bottom: 20px;
						display: block;
					}
					select{
						border-radius: 0;
						background: #fff;
						appearance: none;
						display: block;
						outline: 0;
						border: 1px solid #ccc;
						padding: 5px 10px;
						width: 100%;
						font-size: 1em;
						height: 40px;
						margin-top: 7px;
						background-image: linear-gradient(45deg,transparent 50%,#000 0),linear-gradient(135deg,#000 50%,transparent 0),linear-gradient(90deg,#ccc,#ccc);
						background-position: calc(100% - 17px) calc(1em + 2px),calc(100% - 12px) calc(1em + 2px),calc(100% - 2.1em) .5em;
						background-size: 5px 5px,5px 5px,1px 1.4em;
						background-repeat: no-repeat;
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
						& select{
							border: 1px solid red;
							background-color: rgba(255, 0, 0, .1);
						}
						& .msg{
							display: block;
						}
					}
				`}</style>
			</label>
		)
	}
}
