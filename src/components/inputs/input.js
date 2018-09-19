import React from 'react'
import Label from 'components/inputs/label'

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
			blurred: false,
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
		this.validate(this.state.value)
		this.setState({ blurred: true })
	}
	validate(value) {
		const {
			name,
			required,
			parent,
		} = this.props
		if (required) {
			if (!value) {
				this.setState({ error: `This field is required` })
				if(parent){
					parent.setState({ [name]: `` })
				}
			}
			else {
				this.setState({ error: false })
				if (parent) {
					parent.setState({ [name]: value })
				}
			}
		}
	}
	render() {
		const {
			label,
			type,
			required,
			name,
		} = this.props
		const {
			value,
			error,
			blurred,
		} = this.state

		return (
			<div>
				<Label label={label}>
					<input
						name={name}
						type={type}
						required={required}
						value={value}
						onChange={this.changeHandler}
						onBlur={this.blurHandler}
					/>
					{blurred && error !== false && (
						<div>{error}</div>
					)}
				</Label>
			</div>
		)
	}
}

function noop(){}