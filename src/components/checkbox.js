import React from 'react'
import { css } from '@emotion/core'
import { Field, ErrorMessage } from 'formik'
import Check from '@material-ui/icons/Check'
import { primaryColor } from '../styles/colors'

export default class Checkbox extends React.Component {
	static defaultProps = {
		type: `text`,
	}
	constructor(props) {
		super(props)
		this.state = {
			isFocused: false,
		}
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}
	onFocus() {
		this.setState({ isFocused: true })
	}
	onBlur(e) {
		const { handleBlur } = this.props
		this.setState({ isFocused: false })
		if (handleBlur) {
			handleBlur(e)
		}
	}
	render() {
		const {
			errors,
			touched,
			name,
			label,
			component,
		} = this.props
		const isTouched = touched[name]
		const isErrored = errors[name] && isTouched

		return (
			<label css={[
				isErrored && styles.error,
				styles.inputBlock,
			]}>
				<div css={styles.inputContainer}>
					<Field
						name={name}
						type='checkbox'
						component={component}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
						innerRef={el => this.input = el}
						css={styles.input}
					/>
					<div css={styles.checkbox} className='box'>
						<Check css={styles.check} className='check' />
					</div>
					<div css={styles.label}>
						{label || name}
					</div>
				</div>
				<ErrorMessage
					name={name}
					component='div'
					css={styles.errorMsg}
				/>
			</label>
		)
	}
}

const size = 20

const styles = {
	inputBlock: css`
		display: block;
		margin-bottom: 16px;
		font-size: .9em;
		margin-top: 30px;
	`,
	checkbox: css`
		display: inline-block;
		width: ${size}px;
		height: ${size}px;
		border: 2px solid #999;
		border-radius: 2px;
	`,
	check: css`
		position: relative;
		top: -1px;
		left: -1px;
		opacity: 0;
		font-size: 1.1em;
		color: #999;
	`,
	label: css`
		font-size: .9em;
		display: inline-block;
		position: relative;
		top: -5px;
		margin-left: 7px;
	`,
	inputContainer: css`
		position: relative;
	`,
	input: css`
		opacity: 0;
		position: absolute;
		z-index: -1;
		:checked + div{
			/* background-color: #aaa; */
			.check{
				opacity: 1;
			}
		}
		:active + div, :focus + div{
			border-color: ${primaryColor};
			/* background-color: ${primaryColor}; */
			.check{
				color: ${primaryColor};
			}
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