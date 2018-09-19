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
			autocomplete,
		} = this.props
		const {
			value,
			error,
		} = this.state

		return (
			<label className={cx(styles.label, error && styles.error)}>
				<span>{label}</span>
				<input
					name={name}
					type={type}
					required={required}
					autoComplete={autocomplete}
					value={value}
					onChange={this.changeHandler}
					onBlur={this.blurHandler}
				/>
				{error !== false && (
					<span>{error}</span>
				)}
			</label>
		)
	}
}

function noop(){}

const styles = {
	label: css`
		display: block;
		margin-bottom: 10px;
		input{
			height: 34px;
			width: 100%;
			padding: 0 5px;
			display: block;
		}
	`,
	error: css`
		color: #f00;
		input{
			border: 1px solid #f00;
		}
	`,
}