import React from 'react'
import { cx, css } from 'emotion'

export default class Input extends React.Component {
	static defaultProps = {
		type: `text`,
		required: true,
		setState: noop,
	}
	constructor(props){
		super(props)
		this.state = {
			value: ``,
			error: false,
		}
		this.changeHandler = this.changeHandler.bind(this)
		this.blurHandler = this.blurHandler.bind(this)
	}
	changeHandler(e) {
		const { value } = e.target
		this.setState({ value })
		this.validate(value)
	}
	blurHandler() {
		this.validate(this.state.value, true)
	}
	validate(value, message) {
		const {
			name,
			required,
			parent,
			validate,
		} = this.props
		let error = false

		// Check if required
		if (required && !value) {
			error = `This field is required`
		}

		// Custom validation
		if(validate && value){
			const customError = validate(value)
			if (customError){
				error = customError
			}
		}

		this.setState({ error: message ? error : false })

		if(parent){
			if (error) {
				parent.setState({ [name]: `` })
			}
			else {
				parent.setState({ [name]: value })
			}
		}

	}
	render() {
		const {
			label,
			type,
			required,
			name,
			autoComplete,
		} = this.props
		const {
			value,
			error,
		} = this.state

		const inputProps = {
			name,
			required,
			value,
			onChange: this.changeHandler,
			onBlur: this.blurHandler,
		}

		let inputEl
		if(type === `textarea`){
			inputEl = <textarea {...inputProps} />
		}
		else{
			inputEl = <input {...inputProps} type={type} autoComplete={autoComplete} />
		}

		return (
			<label className={cx(styles.label, error && styles.error)}>
				<span>{label}</span>
				{inputEl}
				{error !== false && (
					<span>{error}</span>
				)}
			</label>
		)
	}
}

function noop(){}

const padding = 8
const styles = {
	label: css`
		display: block;
		margin-bottom: 10px;
		input, textarea{
			width: 100%;
			display: block;
			outline: none;
			border: 1px solid #ccc;
			font-size: .8em;
			:focus{
				border-color: #000;
			}
		}
		input{
			height: 34px;
			padding: 0 ${padding}px;
		}
		textarea{
			padding: ${padding}px;
			height: 100px;
		}
	`,
	error: css`
		color: #f00;
		input, textarea{
			border-color: #f00 !important;
		}
	`,
}