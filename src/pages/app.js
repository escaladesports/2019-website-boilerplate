import React from 'react'
import Layout from '../components/layouts/default'

export default class AppPage extends React.Component{
	render(){
		console.log(this.props)
		return(
			<Layout title='App'>
				<div>App</div>
			</Layout>
		)
	}
}