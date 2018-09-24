import React from 'react'
import { css } from 'emotion'
import Field from './field'
import defaultStyles from './styles'

export default class Input extends React.Component{
	static defaultProps = {
		type: `text`,
	}
	render(){
		return (
			<Field {...this.props}>
				{props => (
					<input {...props} className={styles} />
				)}
			</Field>
		)
	}
}

const styles = css`
	${defaultStyles};
	height: 34px;
	padding-top: 0;
	padding-bottom: 0;
`