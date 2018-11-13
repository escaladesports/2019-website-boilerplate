import React from 'react'
import { css, cx } from 'emotion'
import { Field, ErrorMessage } from 'formik'
import { primaryColor } from '../../styles/colors'

export default class CustomField extends React.Component{
	static defaultProps = {
		type: `text`,
	}
	constructor(props){
		super(props)
		this.state = {
			isFocused: false,
		}
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}
	onFocus(){
		this.setState({ isFocused: true })
	}
	onBlur(e){
		const { handleBlur } = this.props
		this.setState({ isFocused: false })
		if (handleBlur){
			handleBlur(e)
		}
	}
	render(){
		const {
			errors,
			touched,
			type,
			name,
			label,
			component,
			values,
		} = this.props
		const isTouched = touched[name]
		const isErrored = errors[name] && isTouched
		const { isFocused } = this.state
		let value = ``
		if(values){
			value = values[name]
		}
		return (
			<label className={cx(
				isErrored && styles.error,
				styles.inputBlock
			)}>
				<div className={cx(
					styles.label,
					(value || isFocused) && styles.movedLabel
				)}>
					{label || name}
				</div>
				<div className={cx(
					styles.inputContainer,
					!isErrored && isFocused && styles.focusedInputContainer,
					isErrored && styles.erroredInputContainer
				)}>
					<Field
						name={name}
						type={type}
						component={component}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						className={cx(
							styles.input,
							isErrored && styles.erroredInput
						)}
					/>

				</div>
				<ErrorMessage
					name={name}
					component='div'
					className={styles.errorMsg}
				/>
			</label>
		)
	}
}

const styles = {
	inputBlock: css`
		display: block;
		margin-top: 20px;
		font-size: .9em;
	`,
	label: css`
		position: relative;
		z-index: -1;
		transform: scale(1) translate(0, 26px);
		transform-origin: 0;
		transition: transform .2s;
	`,
	movedLabel: css`
		transform: scale(.8) translate(0, 0);
	`,
	inputContainer: css`
		position: relative;
		:after{
			content: '';
			position: absolute;
			height: 2px;
			right: 0;
			left: 0;
			bottom: 0;
			border-bottom: 2px solid ${primaryColor};
			transform: scaleX(0);
			transition: transform .2s;
		}
	`,
	focusedInputContainer: css`
		:after{
			transform: scaleX(1);
		}
	`,
	erroredInputContainer: css`
		:after{
			transform: scaleX(1);
			border-color: #f44336;
		}
	`,
	input: css`
		display: block;
		width: 100%;
		outline: none;
		border: 0;
		font-size: 1em;
		padding: 5px 3px;
		border-bottom: 1px solid #aaa;
		background: transparent;
		margin-bottom: 2px;
		:hover{
			border-bottom: 1px solid #333;
		}
		:focus{
			border-bottom: 1px solid ${primaryColor};
		}
	`,
	error: css`
		color: #f44336;
	`,
	erroredInput: css`
		color: #f44336;
	`,
	errorMsg: css`
		margin-top: 3px;
		font-size: .75em;
		:first-letter{
			text-transform: uppercase;
		}
	`,
}