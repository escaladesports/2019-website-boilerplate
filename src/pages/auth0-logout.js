import React from 'react'
import Layout from '../components/layouts/default'
import Loading from '../components/loading'
import { navigateToPreviousLocation } from '../utils/auth'

export default class Auth0LogoutPage extends React.Component {
	componentDidMount(){
		navigateToPreviousLocation()
	}
	render() {
		return (
			<Layout title='Logging Out'>
				<Loading />
			</Layout>
		)
	}
}