import React from 'react'
import CurrencyInput from 'react-currency-masked-input'
import formatUSD from '../../utils/format-usd'

export function CurrencyControl({
	onChange,
	value,
	classNameWrapper,
	forID,
	setActiveStyle,
	setInactiveStyle,
}) {
	let defaultValue = parseInt(value)
	if (defaultValue) {
		defaultValue = defaultValue / 100
	}

	return (
		<CurrencyInput
			onFocus={setActiveStyle}
			onBlur={setInactiveStyle}
			onChange={e => {
				const value = parseInt(e.target.value.replace(`.`, ``))
				onChange(value)
			}}
			defaultValue={defaultValue || 0}
			id={forID}
			className={classNameWrapper}
		/>
	)
}

export function CurrencyPreview({ value }) {
	return (
		<div>{formatUSD(value)}</div>
	)
}