import React, { useState } from 'react'
import Layout from '../components/layouts/default'
import Loading from 'components/loading'
import { handleAuthentication } from 'utils/auth'

export default function CallbackPage(){
	useState(handleAuthentication, [])
	return (
		<Layout title='Logging In...'>
			<Loading />
		</Layout>
	)
}