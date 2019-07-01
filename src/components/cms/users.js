import React from 'react'
import Person from '@material-ui/icons/Person'
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
						<Person />
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