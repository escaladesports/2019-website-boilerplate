import React from 'react'
import Layout from '../components/layouts/default'
import Loading from '../components/loading'
import { handleAuthentication } from '../utils/auth'

export default class CallbackPage extends React.Component{
	componentDidMount(){
		handleAuthentication()
	}
	render(){
		return (
			<Layout title='Logging In...'>
				<Loading />
			</Layout>
		)
	}
}