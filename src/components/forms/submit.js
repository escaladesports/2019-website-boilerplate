import React from 'react'

export default class extends React.Component {
	render(){
		return (
			<div>
				<input value={this.props.value || 'Submit'} type="submit" />
				<style jsx>{`
					input{
						background-color: #fff;
						color: #333;
						border: 1px solid #333;
						padding: 20px;
						cursor: pointer;
						user-select: none;
						font-size: .75em;
						text-transform: uppercase;
						font-weight: bold;
						outline: 0;
						width: auto;
						margin-bottom: 20px;
						&:hover, &:active, &:focus{
							background-color: #000;
							color: #fff;
						}
					}
				`}</style>
			</div>
		)
	}
}
