import React from 'react'
import { css } from 'emotion'
import Field from './field'
import defaultStyles from './styles'

export default class TextArea extends React.Component{
	static defaultProps = {
		label: `Message`,
		name: `message`,
		type: `textarea`,
	}
	render(){
		return (
			<Field {...this.props}>
				{props => (
					<textarea {...props} className={styles} />
				)}
			</Field>
		)
	}
}

const styles = css`
	${defaultStyles};
	height: 100px;
`