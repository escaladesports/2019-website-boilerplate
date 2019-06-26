import React from 'react'
import Layout from '../components/layouts/default'
import { handleAuthentication } from '../utils/auth'

export default class CallbackPage extends React.Component{
	componentDidMount(){
		handleAuthentication()
	}
	render(){
		return (
			<Layout title='Logging In'>
				<div>Loading...</div>
			</Layout>
		)
	}
}