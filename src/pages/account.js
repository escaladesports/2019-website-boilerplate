import React from 'react'
import { Subscribe } from 'statable'
import { object, string } from 'yup'
import Layout from '../components/layouts/default'
import Field from '../components/field'
import Button from '../components/button'
import Form from '../components/form'
import Error from '../components/error-message'
import Loading from '../components/loading'
import PasswordChange from '../components/accounts/password-change'
import { login, isAuthenticated, patchUser } from '../utils/auth'
import authState from '../state/auth'

export default class AccountPage extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			metaValue: ``,
		}
	}
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
					({ user, loadingUser }) => <>

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
								initialValues={{
									name: user.name || ``,
								}}
								validationSchema={object().shape({
									name: string()
										.required(`required`),
								})}
								loading={
									<Loading />
								}
								error={
									<Error>Server error! Your information was not saved.</Error>
								}
								form={props => <>
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
								</>}
							/>
							<br />
							<PasswordChange />
						</>}

					</>
				}</Subscribe>
			</Layout>
		)
	}
}