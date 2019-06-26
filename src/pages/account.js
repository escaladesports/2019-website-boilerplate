import React from 'react'
import { Subscribe } from 'statable'
import fetch from 'isomorphic-fetch'
import Layout from '../components/layouts/default'
import { login, isAuthenticated } from '../utils/auth'
import authState from '../state/auth'

async function fetchData(user, accessToken){
	try{
		const res = await fetch(`/.netlify/functions/get-auth0-metadata`, {
			method: `POST`,
			headers: {
				authorization: accessToken,
			},
		})
		const data = await res.json()
		console.log(data)
	}
	catch(err){
		console.error(err)
	}
}

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
					({ user, accessToken }) => <>
						{!user && (
							<div>Loading...</div>
						)}
						{user && (
							<>
								<div>Hi, {user.name ? user.name : `friend`}!</div>
								<button onClick={e => {
									e.preventDefault()
									fetchData(user, accessToken)
								}}>Get user info</button>
							</>
						)}
					</>
				}</Subscribe>
			</Layout>
		)
	}
}