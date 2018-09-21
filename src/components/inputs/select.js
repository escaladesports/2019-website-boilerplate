import React from 'react'
import { css } from 'emotion'
import Field from 'components/inputs/field'
import defaultStyles from 'components/inputs/styles'

export default class Select extends React.Component{
	static defaultProps = {
		type: `select`,
	}
	render(){
		const {
			children,
			...props
		} = this.props
		return (
			<Field {...props}>
				{inputProps => (
					<select {...inputProps} className={styles}>
						<option disabled value='' />
						{children}
					</select>
				)}
			</Field>
		)
	}
}

const styles = css`
	${defaultStyles};
	height: 34px;
	border-radius: 0;
	-webkit-appearance: none;
	-webkit-border-radius: 0px;
	background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='32' height='24' viewBox='0 0 32 24'><polygon points='0,0 32,0 16,24' style='fill: rgb%28138, 138, 138%29'></polygon></svg>");
	background-origin: content-box;
	background-position: right 0px center;
	background-repeat: no-repeat;
	background-size: 9px 6px;
`