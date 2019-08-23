import React, { useEffect } from 'react'
import { useGlobal } from 'reactn'
import { object, string } from 'yup'
import Layout from '../components/layouts/default'
import Field from 'components/field'
import Button from 'components/button'
import Form from 'components/form'
import Error from 'components/error-message'
import Success from 'components/success-message'
import Loading from 'components/loading'
import PasswordChange from 'components/password-change'
import { login, isAuthenticated, patchUser } from 'utils/auth'

export default function AccountPage(){
	const [user] = useGlobal(`user`)
	const [loadingUser] = useGlobal(`loadingUser`)

	useEffect(() => {
		// Redirect to login
		if (!isAuthenticated()) {
			login()
		}
	}, [])

	return (
		<Layout title='Your Account'>
			<h1>Your Account</h1>

			{loadingUser && (
				<Loading />
			)}
			{!loadingUser && user && <>
				<div>Hi, {user.name || `friend`}!</div>
				<h2>Info</h2>
				<Form
					onSubmit={async res => {
						await patchUser(res)
					}}
					recaptcha={false}
					persistAfterSuccess={true}
					initialValues={{
						email: user.email || ``,
						name: user.name || ``,
					}}
					validationSchema={object().shape({
						email: string()
							.email()
							.required(`required`),
						name: string()
							.required(`required`),
					})}
					loading={
						<Loading />
					}
					error={
						<Error>Server error! Your information was not saved.</Error>
					}
					success={
						<Success>Your information has been successfully updated.</Success>
					}
					form={props => <>
						<Field
							label='Email'
							name='email'
							type='email'
							{...props}
						/>
						<Field
							label='Name'
							name='name'
							{...props}
						/>
						<Button
							type='submit'
							disabled={props.isSubmitting}
						>
							Save
						</Button>
						<br /><br />
						<PasswordChange />
					</>}
				/>
			</>}
		</Layout>
	)
}