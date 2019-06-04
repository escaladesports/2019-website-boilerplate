import React from 'react'
import CodeMirror from 'react-codemirror'
import { css } from '@emotion/core'
import styles from '!!raw-loader!codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed'

export class HTMLControl extends React.Component{
	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(value){
		this.props.onChange(value)
	}
	render(){
		const {
			value,
			classNameWrapper,
			forID,
			setActiveStyle,
			setInactiveStyle,
		} = this.props
		return (
			<div css={css`${styles}`}>
				<CodeMirror
					onFocus={setActiveStyle}
					onBlur={setInactiveStyle}
					onChange={this.handleChange}
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
}

export class HTMLPreview extends React.Component{
	render(){
		return (
			<div dangerouslySetInnerHTML={{ __html: this.props.value }} />
		)
	}
}