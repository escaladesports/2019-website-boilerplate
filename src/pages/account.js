import React from 'react'
import { Subscribe } from 'statable'
import Layout from '../components/layouts/default'
import { login, isAuthenticated } from '../functions/auth'
import authState from '../state/auth'

export default class AccountPage extends React.Component {
	componentDidMount(){
		// Redirect to login
		if (!isAuthenticated()){
			login()
		}
	}
	render() {
		return (
			<Layout title='Your Account'>
				<h1>Your Account</h1>
				<Subscribe to={authState}>{
					({ user }) => <>
						{!user && (
							<div>Loading...</div>
						)}
						{user && (
							<div>Hi, {user.name ? user.name : `friend`}!</div>
						)}
					</>
				}</Subscribe>
			</Layout>
		)
	}
}