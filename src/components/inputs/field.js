import React from 'react'
import { css, cx } from 'emotion'
import { Field, ErrorMessage } from 'formik'

export default class CustomField extends React.Component{
	static defaultProps = {
		type: `text`,
	}
	constructor(props){
		super(props)
		this.state = {
			focus: false,
		}
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}
	onFocus(){
		this.setState({ focus: true })
	}
	onBlur(e){
		const { handleBlur } = this.props
		this.setState({ focus: false })
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
					(isTouched || value || this.state.focus) && styles.movedLabel
				)}>
					{label || name}
				</div>
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
	`,
	label: css`
		position: relative;
		z-index: -1;
		transform: scale(1) translate(5px, 26px);
		transform-origin: 0;
		transition: transform .2s;
	`,
	movedLabel: css`
		transform: scale(.8) translate(0, 0);
	`,
	input: css`
		display: block;
		width: 100%;
		outline: none;
		border: 0;
		font-size: 1em;
		padding: 5px 3px;
		border-bottom: 1px solid #333;
		background: transparent;
	`,
	error: css`
		color: #f44336;
	`,
	erroredInput: css`
		color: #f44336;
		border-color: #f44336;
	`,
	errorMsg: css`
		margin-top: 3px;
		font-size: .75em;
		:first-letter{
			text-transform: uppercase;
		}
	`,
}