import React from 'react'
import { cx, css } from 'emotion'
import InputMask from 'react-input-mask'

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
			mask,
			children,
		} = this.props
		const {
			value,
			error,
		} = this.state

		const inputProps = {
			name,
			required,
			value,
			autoComplete,
			onChange: this.changeHandler,
			onBlur: this.blurHandler,
		}

		let inputEl
		if(type === `textarea`){
			inputEl =
				<textarea
					{...inputProps}
					className={cx(styles.field, styles.textarea)}
				/>
		}
		else if(type === `select`){
			inputEl =
				<select
					{...inputProps}
					className={cx(styles.field, styles.select)}
				>
					<option disabled value='' />
					{children}
				</select>
		}
		else if(type === `checkbox`){
			inputEl =
				<input
					{...inputProps}
					type={type}
				/>
		}
		else{
			if(mask){
				inputEl =
					<InputMask
						mask={mask}
						onChange={this.changeHandler}
						onBlur={this.blurHandler}
						value={value}
					>
						{maskProps => (
							<input
								{...inputProps}
								{...maskProps}
								type={type}
								className={cx(styles.field, styles.input)}
							/>
						)}
					</InputMask>
			}
			else {
				inputEl =
					<input
						{...inputProps}
						type={type}
						className={cx(styles.field, styles.input)}
					/>
			}
		}

		return (
			<label className={cx(styles.label, error && styles.error)}>
				{!!label && (
					<span>
						{label}
						{!required && type !== `checkbox` && ` (optional)`}
						{type === `checkbox` && `: `}
					</span>
				)}
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
	`,
	field: css`
		width: 100%;
		display: block;
		outline: none;
		border: 1px solid #ccc;
		font-size: .8em;
		background-color: transparent;
		:focus{
			border-color: #000;
		}
		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus{
			-webkit-box-shadow: 0 0 0px 1000px #fff inset;
		}
	`,
	input: css`
		height: 34px;
		padding: 0 ${padding}px;
	`,
	textarea: css`
		padding: ${padding}px;
		height: 100px;
	`,
	select: css`
		height: 34px;
		border-radius: 0;
		-webkit-appearance: none;
		-webkit-border-radius: 0px;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>");
		background-origin: content-box;
		background-position: right 0px center;
		background-repeat: no-repeat;
		background-size: 9px 6px;
		padding: ${padding}px;
	`,
	error: css`
		color: #f00;
		input, textarea{
			border-color: #f00 !important;
		}
	`,
}