import React from 'react'
import { Subscribe } from 'statable'
import Layout from '../components/layouts/default'
import { login, isAuthenticated } from '../functions/auth'
import authState from '../state/auth'

export default class AccountPage extends React.Component {
	componentDidMount(){
		if (!isAuthenticated()){
			login()
		}
	}
	render() {
		return (
			<Layout title='Your Account'>
				<Subscribe to={authState}>{
					({ user }) => <>
						<h1>Your Account</h1>
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