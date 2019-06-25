import React from 'react'
import Layout from '../components/layouts/default'
import { login, isAuthenticated, getProfile } from '../functions/auth'

export default class AccountPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			status: `loading`,
		}
	}
	componentDidMount(){
		if (!isAuthenticated()) {
			login()
			return
		}
		this.setState({ status: `loggedIn` })
	}
	render() {
		const { status } = this.state
		const user = getProfile()
		return (
			<Layout title='Your Account'>
				<h1>Your Account</h1>
				{status === `loading` && (
					<div>Loading...</div>
				)}
				{status === `loggedIn` && (
					<div>Hi, {user.name ? user.name : `friend`}!</div>
				)}
			</Layout>
		)
	}
}