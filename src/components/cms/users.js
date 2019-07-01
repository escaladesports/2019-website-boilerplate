import React from 'react'
import People from '@material-ui/icons/People'
import Modal from '../modal'

export default class UsersPane extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			open: false,
		}
	}
	render(){
		return (
			<>
				<button
					className={this.props.buttonClasses}
					onClick={() => this.setState({ open: true })}
				>
					<span className={this.props.iconClasses}>
						<People />
					</span>
					Users
				</button>
				<Modal
					open={this.state.open}
					onClose={() => this.setState({ open: false })}
				>
					This is a test.
				</Modal>
			</>
		)
	}
}