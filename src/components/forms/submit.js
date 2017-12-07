import React from 'react'

export default class extends React.Component {
	render(){
		return (
			<div>
				<button type='submit'>{this.props.value || 'Submit'}</button>
				<style jsx>{`
					button{
						border-radius: 0;
						background-color: #333;
						color: #fff;
						border: 1px solid #333;
						padding: 10px 30px;
						cursor: pointer;
						user-select: none;
						font-size: .75em;
						text-transform: uppercase;
						font-weight: bold;
						outline: 0;
						width: auto;
						margin-bottom: 20px;
						&:hover, &:active, &:focus{
							background-color: #fff;
							color: #333;
						}
					}
				`}</style>
			</div>
		)
	}
}
