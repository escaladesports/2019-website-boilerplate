import React from 'react'

export default class extends React.Component {
	render(){
		return (
			<div>
				{ this.props.message }
				<style jsx>{`
					div{
						border: 1px solid #f00;
						background-color: rgba(255, 0, 0, .1);
						padding: 10px;
						margin-bottom: 20px;
					}
				`}</style>
			</div>
		)
	}
}
