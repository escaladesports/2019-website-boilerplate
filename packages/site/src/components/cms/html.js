import React from 'react'
import CodeMirror from 'react-codemirror'
import { css } from '@emotion/core'
import styles from '!!raw-loader!codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed'

export function HTMLControl({
	value,
	onChange,
	classNameWrapper,
	forID,
	setActiveStyle,
	setInactiveStyle,
}) {
	return (
		<div css={css`${styles}`}>
			<CodeMirror
				onFocus={setActiveStyle}
				onBlur={setInactiveStyle}
				onChange={() => {
					onChange(value)
				}}
				value={value}
				id={forID}
				className={classNameWrapper}
				options={{
					mode: `htmlmixed`,
					indentWithTabs: true,
					tabSize: 3,
				}}
			/>
		</div>
	)
}

export function HTMLPreview({ value }) {
	return (
		<div dangerouslySetInnerHTML={{ __html: value }} />
	)
}