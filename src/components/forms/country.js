import React from 'react'
import Select from 'components/forms/select'
import CountryList from 'country-list'
const countries = CountryList().getNames()

export default class extends React.Component {
	render() {
		return (
			<Select handleBlur={this.props.handleBlur} required={this.props.required} name={this.props.name} label={this.props.label}>
				<option value="United States" defaultValue="selected">United States</option>
				<option value="Canada">Canada</option>
				<optgroup label="-------------------"></optgroup>
				{countries.map((country, key) => {
					if(country === 'United States' || country === 'Canada') return ''
					return <option key={key} value={country}>{country}</option>
				})}
				<option value="Other...">Other...</option>
			</Select>
		)
	}
}