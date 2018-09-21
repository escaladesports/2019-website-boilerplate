import React from 'react'
import { cx, css } from 'emotion'
import InputMask from 'react-input-mask'

export default class Field extends React.Component {
	static defaultProps = {
		required: true,
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
		const { value, checked } = e.target
		if (this.props.type !== `checkbox`) {
			this.setState({ value })
			this.validate(value)
		}
		else{
			const { parent, name } = this.props
			this.setState({ value: checked })
			if (parent) {
				parent.setState({ [name]: checked })
			}
		}
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
			type,
			onChange: this.changeHandler,
			onBlur: this.blurHandler,
		}

		let inputEl
		if (mask) {
			inputEl =
				<InputMask
					mask={mask}
					onChange={this.changeHandler}
					onBlur={this.blurHandler}
					value={value}
				>
					{maskProps => children({
						...inputProps,
						...maskProps,
					})}
				</InputMask>
		}
		else{
			inputEl = children(inputProps)
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

const styles = {
	label: css`
		display: block;
		margin-bottom: 10px;
	`,
	error: css`
		color: #f00;
		input, textarea{
			border-color: #f00 !important;
		}
	`,
}