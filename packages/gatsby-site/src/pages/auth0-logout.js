import React, { useState } from 'react'
import Layout from 'components/layouts/default'
import Loading from 'components/loading'
import { navigateToPreviousLocation } from 'utils/auth'

export default function Auth0LogoutPage(){
	useState(navigateToPreviousLocation, [])
	return (
		<Layout title='Logging Out...'>
			<Loading />
		</Layout>
	)
}