import React from 'react'
import { css } from 'emotion'
import Field from 'components/inputs/field'
import defaultStyles from 'components/inputs/styles'

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