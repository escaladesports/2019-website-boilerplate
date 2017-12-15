import React from 'react'
import Select from 'components/forms/select'
import states from 'datasets-us-states-names'

export default class extends React.Component {
	render() {
			return (
				<Select handleBlur={this.props.handleBlur} required={this.props.required} name={this.props.name} label={this.props.label}>
					<optgroup label="United States">
						{states.map((state, key) => {
							return <option key={key} value={state}>{state}</option>
						})}
					</optgroup>
					<optgroup label="Canada">
						<option value="AB">Alberta</option>
						<option value="BC">British Columbia</option>
						<option value="MB">Manitoba</option>
						<option value="NB">New Brunswick</option>
						<option value="NL">Newfoundland and Labrador</option>
						<option value="NT">Northwest Territory</option>
						<option value="NS">Nova Scotia</option>
						<option value="NU">Nunavut Territory</option>
						<option value="ON">Ontario</option>
						<option value="PE">Prince Edward Island</option>
						<option value="QC">Quebec</option>
						<option value="SK">Saskatchewan</option>
						<option value="YT">Yukon Territory</option>
					</optgroup>
					<option value="other">Other...</option>
				</Select>
		)
	}
}